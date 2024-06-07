/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaService, QUERY_SORT } from '@app/common';
import { FilterBookDto } from '@app/common/book';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BookRepository {
  private readonly TAKE = 4;
  constructor(private readonly prisma: PrismaService) {}

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

  async getBooksForCronRating() {
    const books = await this.prisma.book.findMany({
      include: {
        reviews: true,
      },
    });

    return books.filter((item) => item.reviews.length > 0);
  }
  async getBooksForCronPrice() {
    const promotionOfBooks = await this.prisma.promotion.findMany({
      include: {
        book: {
          include: {
            prices: true,
          },
        },
      },
    });

    const books = await this.prisma.book.findMany({});
    const booksWithPromotion = promotionOfBooks.filter((promotion) =>
      books.some((book) => book.id === promotion.bookId),
    );

    return booksWithPromotion.map((item) => {
      const lastedPrice = item.book.prices.find((p) => p.endDate === null);
      delete item.book.prices;
      return {
        ...item,
        ...item.book,
        ...lastedPrice,
      };
    });
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

  async findAll() {
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

  async createBookPricePromotion(data: any) {
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

  async createBookPrice(id: string, data: any) {
    const bookPrice = await this.prisma.bookPrice.create({
      data: {
        book: {
          connect: {
            id: id,
          },
        },
        originalPrice: data.originalPrice,
        discountPrice: 0,
        startDate: new Date(),
      },
    });
    console.log(bookPrice);
    return bookPrice;
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

  async findByFilter(filter: FilterBookDto) {
    const skip = filter.skip ? filter.skip : 0;

    const whereCondition: any = {
      AND: [],
    };

    if (filter.sortByEnum) {
      switch (filter.sortByEnum) {
        case QUERY_SORT.SALE:
          whereCondition.AND.push({
            promotions: {
              endDate: {
                gte: new Date(),
              },
            },
          });
          break;
        case QUERY_SORT.POPULAR:
          whereCondition.AND.push({
            orderItems: {
              some: {
                order: {
                  status: 'Completed',
                },
              },
            },
          });
          break;
        default:
          whereCondition.AND.push({});
          break;
      }
    }

    if (filter.rating && filter.rating.length > 0) {
      if (filter.rating.length === 1) {
        const [min] = filter.rating.map(Number);
        whereCondition.AND.push({ rating: { gte: min, lte: min + 1 } });
      } else {
        const [min, max] = filter.rating.map(Number).sort((a, b) => a - b);
        whereCondition.AND.push({ rating: { gte: min, lte: max } });
      }
    }

    if (filter.category && filter.category.length > 0) {
      whereCondition.AND.push({ categoryId: { in: filter.category } });
    }

    if (filter.author && filter.author.length > 0) {
      whereCondition.AND.push({
        authors: { some: { authorId: { in: filter.author } } },
      });
    }
    const [list, total] = await Promise.all([
      await this.prisma.book.findMany({
        skip,
        take: this.TAKE,
        where: whereCondition,
        include: {
          prices: true,
          promotions: true,
        },
      }),
      await this.countBook(whereCondition),
    ]);
    if (
      filter.sortByEnum === QUERY_SORT.ASC ||
      filter.sortByEnum === QUERY_SORT.DESC
    ) {
      const final = this.getLatestPrice(list);
      final
        .sort((a, b) => {
          if (filter.sortByEnum === QUERY_SORT.ASC) {
            return a.prices[0].originalPrice - b.prices[0].originalPrice;
          } else {
            return b.prices[0].originalPrice - a.prices[0].originalPrice;
          }
        })
        .slice(skip, skip + this.TAKE);

      return {
        books: final,
        total: total,
      };
    } else {
      return {
        books: this.getLatestPrice(list),
        total,
      };
    }
  }

  private async countBook(whereCondition: any) {
    return await this.prisma.book.count({
      where: whereCondition,
    });
  }

  private getLatestPrice(books: any) {
    const final = books.map((book) => {
      const lastedPrice = book.prices.find((p) => p.endDate === null);
      return {
        ...book,
        prices: [lastedPrice],
        createdAt: lastedPrice.createdAt,
      };
    });

    return final;
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
