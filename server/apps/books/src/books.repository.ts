/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaService, QUERY_SORT } from '@app/common';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BookRepository {
  private readonly TAKE = 4;
  constructor(private readonly prisma: PrismaService) {}

  async findAll(skip: number, type: QUERY_SORT) {
    let books;
    switch (type) {
      case QUERY_SORT.ASC:
        books = await this.sortByPriceASC(skip);
        break;
      case QUERY_SORT.DESC:
        books = await this.sortByPriceDESC(skip);
        break;
      case QUERY_SORT.SALE:
        books = await this.sortByPromotion(skip);
      case QUERY_SORT.POPULAR:
        books = await this.sortByPopular(skip);
      default:
        break;
    }

    const booksMap = (books as Array<any>).map((book) =>
      this.convertRecordToBook(book),
    );

    const total = await this.prisma.book.count();

    return {
      books: booksMap,
      total,
    };
  }

  async findAllAdmin() {
    const books = await this.prisma.book.findMany({
      include: {
        prices: true,
        category: true,
        publishers: {
          select: {
            publisher: true,
          },
        },
      },
    });
    return books;
  }

  async getBooksForCron() {
    const books = await this.prisma.book.findMany({
      include: {
        reviews: true,
      },
    });

    return books.filter((item) => item.reviews.length > 0);
  }

  async findOne(id: string) {
    const book = await this.prisma.book.findUnique({
      where: {
        id: id,
      },
      include: {
        authors: {
          select: {
            author: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        category: true,
        prices: true,
        publishers: {
          select: {
            publisher: true,
          },
        },
      },
    });
    return book;
  }

  async create(data: any) {
    const book = await this.prisma.book.create({
      data: {
        category: {
          connect: {
            id: data.category,
          },
        },
        publishers: {
          create: {
            publisherId: data.publisher,
          },
        },
        authors: {
          create: {
            authorId: data.author,
          },
        },
        ratings: [0, 0, 0, 0, 0],
        title: data.title,
        description: data.description,
        prices: {
          create: {
            originalPrice: data.originalPrice,
            startDate: new Date(),
            discountPrice: 0,
          },
        },
        images: data.images,
      },
    });
    return book;
  }

  async getRecommendBooksByRating() {
    const books = await this.prisma.book.findMany({
      where: {
        rating: {
          gte: 4,
        },
      },
      orderBy: {
        rating: 'desc',
      },
      include: {
        prices: true,
      },
      take: 20,
    });
    return books;
  }

  async createBookPrice(data: any) {
    const bookPrice = await this.prisma.bookPrice.create({
      data: {
        book: {
          connect: {
            id: data.bookId,
          },
        },
        originalPrice: data.originalPrice,
        discountPrice: data.originalPrice * 0.9,
        startDate: new Date(),
      },
    });
    if (bookPrice) {
      this.updateOldPrice(data.old_price_id);
      return bookPrice;
    }
    return false;
  }

  private async updateOldPrice(id: string) {
    const bookPrice = await this.prisma.bookPrice.update({
      where: {
        id: id,
      },
      data: {
        endDate: new Date(),
      },
    });
    return bookPrice;
  }

  async update(id: string, data: any) {
    const book = await this.prisma.book.update({
      where: {
        id: id,
      },
      data: {
        ...data,
      },
    });
    return book;
  }

  async delete(id: string) {
    const book = await this.prisma.book.delete({
      where: {
        id: id,
      },
    });
    return book;
  }
  async search(q: string) {
    const books = await this.prisma.book.findMany({
      where: {
        OR: [
          { title: { contains: q, mode: 'insensitive' } },
          { description: { contains: q, mode: 'insensitive' } },
        ],
      },
      include: {
        category: true,
        prices: true,
        publishers: {
          select: {
            publisher: true,
          },
        },
      },
    });
    return books;
  }

  private async sortByPriceASC(skip: number) {
    const books = await this.prisma.$queryRaw`
    SELECT
    books.*,
    last_prices.*
    FROM
        books
    left join
      (
    		select * from book_prices bp
        where bp.end_date is null
      ) as last_prices on last_prices.book_id = books.book_id
    order by last_prices.original_price asc
    limit ${this.TAKE}
    offset ${skip};`;
    return books;
  }

  private async sortByPriceDESC(skip: number) {
    const books = await this.prisma.$queryRaw`
    SELECT
    books.*,
    last_prices.*
    FROM
        books
    left join
      (
    		select * from book_prices bp
        where bp.end_date is null
      ) as last_prices on last_prices.book_id = books.book_id
    order by last_prices.original_price desc
    limit ${this.TAKE}
    offset ${skip};`;
    return books;
  }

  private async sortByPromotion(skip: number) {
    const books = await this.prisma.$queryRaw`
    SELECT
        books.*,
        last_prices.*
    FROM
        books
    LEFT JOIN
        (
            SELECT * FROM book_prices bp
            WHERE bp.end_date IS NULL
        ) AS last_prices ON last_prices.book_id = books.book_id
    LEFT JOIN
        (
            SELECT p.*
            FROM promotions p
            WHERE p.created_at = (
                SELECT MAX(created_at)
                FROM promotions p2
                WHERE p2.book_id = p.book_id
            )
        ) AS promotion_latest ON promotion_latest.book_id = books.book_id
    WHERE
        promotion_latest.promotion_id IS NOT null
    LIMIT ${this.TAKE}
    OFFSET ${skip};`;
    return books;
  }

  private async sortByPopular(skip: number) {
    const books = await this.prisma.$queryRaw`
    SELECT
        b.*,
        last_prices.*,
        SUM(oi.quantity) as quantitySale
    FROM
        orders o
    LEFT JOIN
        order_items oi ON o.order_id = oi.order_id
    LEFT JOIN
        books b ON b.book_id = oi.book_id
    LEFT JOIN
        (
            SELECT * FROM book_prices bp
            WHERE bp.end_date IS NULL
        ) AS last_prices ON last_prices.book_id = b.book_id
    LEFT JOIN
        book_authors ba ON ba.book_id = b.book_id
    WHERE
        o.status = 'Completed'
    GROUP BY
        b.book_id,
        last_prices.price_id,
        last_prices.book_id,
        last_prices.start_date,
        last_prices.end_date,
        last_prices.original_price,
        last_prices.discount_price,
        last_prices.created_at,
        last_prices.updated_at,
        last_prices.deleted_at
    order by quantitySale desc
    LIMIT ${this.TAKE}
    OFFSET ${skip};`;
    return books;
  }

  private async sortByPriceASCAuthor(skip: number, id: string) {
    const books = await this.prisma.$queryRaw`
    SELECT
    books.*,
    last_prices.*
    FROM
        book_authors
    left JOIN
        books ON book_authors.book_id = books.book_id
    left join
      (
    		select * from book_prices bp
        where bp.end_date is null
      ) as last_prices on last_prices.book_id = books.book_id
    WHERE
        book_authors.author_id = ${id}
    order by last_prices.original_price asc
    limit ${this.TAKE}
    offset ${skip};`;
    return books;
  }

  private async sortByPriceDESCAuthor(skip: number, id: string) {
    const books = await this.prisma.$queryRaw`
    SELECT
    books.*,
    last_prices.*
    FROM
        book_authors
    left JOIN
        books ON book_authors.book_id = books.book_id
    left join
      (
    		select * from book_prices bp
        where bp.end_date is null
      ) as last_prices on last_prices.book_id = books.book_id
    WHERE
        book_authors.author_id = ${id}
    order by last_prices.original_price desc
    limit ${this.TAKE}
    offset ${skip};`;
    return books;
  }

  private async sortByPromotionAuthor(skip: number, id: string) {
    const books = await this.prisma.$queryRaw`
    SELECT
        books.*,
        last_prices.*
    FROM
        book_authors
    LEFT JOIN
        books ON book_authors.book_id = books.book_id
    LEFT JOIN
        (
            SELECT * FROM book_prices bp
            WHERE bp.end_date IS NULL
        ) AS last_prices ON last_prices.book_id = books.book_id
    LEFT JOIN
        (
            SELECT p.*
            FROM promotions p
            WHERE p.created_at = (
                SELECT MAX(created_at)
                FROM promotions p2
                WHERE p2.book_id = p.book_id
            )
        ) AS promotion_latest ON promotion_latest.book_id = books.book_id
    WHERE
        book_authors.author_id = ${id}
        and promotion_latest.promotion_id IS NOT null
    LIMIT ${this.TAKE}
    OFFSET ${skip};`;
    return books;
  }

  private async sortByPopularOfAuthor(skip: number, id: string) {
    const books = await this.prisma.$queryRaw`
    SELECT
        b.*,
        last_prices.*,
        SUM(oi.quantity) as quantitySale
    FROM
        orders o
    LEFT JOIN
        order_items oi ON o.order_id = oi.order_id
    LEFT JOIN
        books b ON b.book_id = oi.book_id
    LEFT JOIN
        (
            SELECT * FROM book_prices bp
            WHERE bp.end_date IS NULL
        ) AS last_prices ON last_prices.book_id = b.book_id
    LEFT JOIN
        book_authors ba ON ba.book_id = b.book_id
    WHERE
        o.status = 'Completed'
        AND ba.author_id = ${id}
    GROUP BY
        b.book_id,
        last_prices.price_id,
        last_prices.book_id,
        last_prices.start_date,
        last_prices.end_date,
        last_prices.original_price,
        last_prices.discount_price,
        last_prices.created_at,
        last_prices.updated_at,
        last_prices.deleted_at
    order by quantitySale desc
    LIMIT ${this.TAKE}
    OFFSET ${skip};`;
    return books;
  }

  private async sortByPriceASCRating(skip: number, rating: number) {
    const books = await this.prisma.$queryRaw`
    SELECT
    books.*,
    last_prices.*
    FROM
        books
    left join
      (
    		select * from book_prices bp
        where bp.end_date is null
      ) as last_prices on last_prices.book_id = books.book_id
    WHERE
        books.rating >= ${rating} and books.rating < ${rating + 1}
    order by last_prices.original_price asc
    limit ${this.TAKE}
    offset ${skip};`;
    return books;
  }

  private async sortByPriceDESCRating(skip: number, rating: number) {
    const books = await this.prisma.$queryRaw`
    SELECT
    books.*,
    last_prices.*
    FROM
        books
    left join
      (
    		select * from book_prices bp
        where bp.end_date is null
      ) as last_prices on last_prices.book_id = books.book_id
    WHERE
        books.rating >= ${rating} and books.rating < ${rating + 1}
    order by last_prices.original_price desc
    limit ${this.TAKE}
    offset ${skip};`;
    return books;
  }

  private async sortByPromotionRating(skip: number, rating: number) {
    const books = await this.prisma.$queryRaw`
    SELECT
        books.*,
        last_prices.*
    FROM
        books
    LEFT JOIN
        (
            SELECT * FROM book_prices bp
            WHERE bp.end_date IS NULL
        ) AS last_prices ON last_prices.book_id = books.book_id
    LEFT JOIN
        (
            SELECT p.*
            FROM promotions p
            WHERE p.created_at = (
                SELECT MAX(created_at)
                FROM promotions p2
                WHERE p2.book_id = p.book_id
            )
        ) AS promotion_latest ON promotion_latest.book_id = books.book_id
    WHERE
    books.rating >= ${rating} and books.rating < ${rating + 1}
        and promotion_latest.promotion_id IS NOT null
    LIMIT ${this.TAKE}
    OFFSET ${skip};`;
    return books;
  }

  private async sortByPopularRating(skip: number, rating: number) {
    const books = await this.prisma.$queryRaw`
    SELECT
        b.*,
        last_prices.*,
        SUM(oi.quantity) as quantitySale
    FROM
        orders o
    LEFT JOIN
        order_items oi ON o.order_id = oi.order_id
    LEFT JOIN
        books b ON b.book_id = oi.book_id
    LEFT JOIN
        (
            SELECT * FROM book_prices bp
            WHERE bp.end_date IS NULL
        ) AS last_prices ON last_prices.book_id = b.book_id
    LEFT JOIN
        book_authors ba ON ba.book_id = b.book_id
    WHERE
        o.status = 'Completed'
        AND b.rating >= ${rating} and b.rating < ${rating + 1}

    GROUP BY
        b.book_id,
        last_prices.price_id,
        last_prices.book_id,
        last_prices.start_date,
        last_prices.end_date,
        last_prices.original_price,
        last_prices.discount_price,
        last_prices.created_at,
        last_prices.updated_at,
        last_prices.deleted_at
    order by quantitySale desc
    LIMIT ${this.TAKE}
    OFFSET ${skip};`;
    return books;
  }

  private async sortByPriceASCOfCategory(skip: number, id: string) {
    const books = await this.prisma.$queryRaw`
    SELECT
    books.*,
    last_prices.*
    FROM
        book_authors
    left JOIN
        books ON book_authors.book_id = books.book_id
    left join
      (
    		select * from book_prices bp
        where bp.end_date is null
      ) as last_prices on last_prices.book_id = books.book_id
    WHERE
        book_authors.author_id = ${id}
    order by last_prices.original_price asc
    limit ${this.TAKE}
    offset ${skip};`;
    return books;
  }

  private async sortByPriceDESCOfCategory(skip: number, id: string) {
    const books = await this.prisma.$queryRaw`
    SELECT
    books.*,
    last_prices.*
    FROM
        book_authors
    left JOIN
        books ON book_authors.book_id = books.book_id
    left join
      (
    		select * from book_prices bp
        where bp.end_date is null
      ) as last_prices on last_prices.book_id = books.book_id
    WHERE
        book_authors.author_id = ${id}
    order by last_prices.original_price desc
    limit ${this.TAKE}
    offset ${skip};`;
    return books;
  }

  private async sortByPromotionOfCategory(skip: number, id: string) {
    const books = await this.prisma.$queryRaw`
    SELECT
        books.*,
        last_prices.*
    FROM
        book_authors
    LEFT JOIN
        books ON book_authors.book_id = books.book_id
    LEFT JOIN
        (
            SELECT * FROM book_prices bp
            WHERE bp.end_date IS NULL
        ) AS last_prices ON last_prices.book_id = books.book_id
    LEFT JOIN
        (
            SELECT p.*
            FROM promotions p
            WHERE p.created_at = (
                SELECT MAX(created_at)
                FROM promotions p2
                WHERE p2.book_id = p.book_id
            )
        ) AS promotion_latest ON promotion_latest.book_id = books.book_id
    WHERE
        book_authors.author_id = ${id}
        and promotion_latest.promotion_id IS NOT null
    LIMIT ${this.TAKE}
    OFFSET ${skip};`;
    return books;
  }
  private async sortByPopularOfCategory(skip: number, id: string) {
    const books = await this.prisma.$queryRaw`
    SELECT
        b.*,
        last_prices.*,
        SUM(oi.quantity) as quantitySale
    FROM
        orders o
    LEFT JOIN
        order_items oi ON o.order_id = oi.order_id
    LEFT JOIN
        books b ON b.book_id = oi.book_id
    LEFT JOIN
        (
            SELECT * FROM book_prices bp
            WHERE bp.end_date IS NULL
        ) AS last_prices ON last_prices.book_id = b.book_id
    LEFT JOIN
        categories c on c.category_id = b.category_id
    WHERE
        o.status = 'Completed'
        AND c.category_id  = ${id}
    GROUP BY
        b.book_id,
        last_prices.price_id,
        last_prices.book_id,
        last_prices.start_date,
        last_prices.end_date,
        last_prices.original_price,
        last_prices.discount_price,
        last_prices.created_at,
        last_prices.updated_at,
        last_prices.deleted_at
    order by quantitySale desc
    LIMIT ${this.TAKE}
    OFFSET ${skip};`;
    return books;
  }

  private convertRecordToBook(record: any) {
    return {
      id: record.book_id,
      title: record.title,
      description: record.description,
      categoryId: record.category_id,
      rating: record.rating,
      ratings: record.ratings,
      images: record.images,
      quantity: record.quantity,
      createdAt: record.created_at,
      updatedAt: record.updated_at,
      deletedAt: record.deleted_at,
      prices: [
        {
          id: record.price_id,
          bookId: record.book_id,
          originalPrice: record.original_price,
          discountPrice: record.discount_price,
          startDate: record.start_date,
          endDate: record.end_date,
          createdAt: record.created_at,
          updatedAt: record.updated_at,
          deletedAt: record.deleted_at,
        },
      ],
    };
  }

  async getBookByAuthor(author_id: string, skip: number, type: QUERY_SORT) {
    let books;

    switch (type) {
      case QUERY_SORT.ASC:
        books = await this.sortByPriceASCAuthor(skip, author_id);
        break;
      case QUERY_SORT.DESC:
        books = await this.sortByPriceDESCAuthor(skip, author_id);
        break;
      case QUERY_SORT.SALE:
        books = await this.sortByPromotionAuthor(skip, author_id);
      case QUERY_SORT.POPULAR:
        books = await this.sortByPopularOfAuthor(skip, author_id);
      default:
        break;
    }
    const mappedBooks = (books as Array<any>).map((book) =>
      this.convertRecordToBook(book),
    );

    const total = await this.prisma.author.findFirst({
      where: {
        id: author_id,
      },
      select: {
        books: true,
      },
    });
    return {
      books: mappedBooks,
      total: total.books.length,
    };
  }
  async getBookByCategory(category: string, skip: number, type: QUERY_SORT) {
    let books;
    switch (type) {
      case QUERY_SORT.ASC:
        books = await this.sortByPriceASCOfCategory(skip, category);
        break;
      case QUERY_SORT.DESC:
        books = await this.sortByPriceDESCOfCategory(skip, category);
        break;
      case QUERY_SORT.SALE:
        books = await this.sortByPromotionOfCategory(skip, category);
      case QUERY_SORT.POPULAR:
        books = await this.sortByPopularOfCategory(skip, category);
      default:
        break;
    }

    const booksOfCategory = (books as Array<any>).map((book) =>
      this.convertRecordToBook(book),
    );

    const total = await this.prisma.category.findFirst({
      where: {
        id: category,
      },
      select: {
        books: true,
      },
    });
    return {
      books: booksOfCategory,
      total: total.books.length,
    };
  }
  async getBookByRating(rating: number, skip: number, type: QUERY_SORT) {
    let books;
    switch (type) {
      case QUERY_SORT.ASC:
        books = await this.sortByPriceASCRating(
          skip,
          rating === 5 ? rating + 1 : rating,
        );
        break;
      case QUERY_SORT.DESC:
        books = await this.sortByPriceDESCRating(
          skip,
          rating === 5 ? rating + 1 : rating,
        );
        break;
      case QUERY_SORT.SALE:
        books = await this.sortByPromotionRating(
          skip,
          rating === 5 ? rating + 1 : rating,
        );
        break;
      case QUERY_SORT.POPULAR:
        books = await this.sortByPopularRating(
          skip,
          rating === 5 ? rating + 1 : rating,
        );
      default:
        break;
    }

    const booksOfRating = (books as Array<any>).map((book) =>
      this.convertRecordToBook(book),
    );

    const total = await this.prisma.book.count();

    return {
      books: booksOfRating,
      total,
    };
  }

  async searchByTitle(q: string) {
    const books = await this.prisma.book.findMany({
      where: {
        title: {
          contains: q,
          mode: 'insensitive',
        },
      },
      include: {
        category: true,
        prices: true,
        publishers: {
          select: {
            publisher: true,
          },
        },
      },
    });
    return books;
  }
}
