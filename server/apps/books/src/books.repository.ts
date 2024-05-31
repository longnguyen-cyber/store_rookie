/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaService } from '@app/common';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BookRepository {
  private readonly TAKE = 2;
  constructor(private readonly prisma: PrismaService) {}

  async findAll(skip: number) {
    const total = await this.prisma.book.count();
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
      skip,
      take: this.TAKE,
    });
    return {
      books,
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
      orderBy: {
        rating: 'desc',
      },
      include: {
        prices: true,
      },
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

  async getBookByCategory(category: string, skip: number) {
    const booksOfCategory = await this.prisma.category.findFirst({
      where: {
        id: category,
      },
      select: {
        books: {
          include: {
            prices: true,
            promotions: true,
          },
          skip,
          take: this.TAKE,
        },
      },
    });
    const total = await this.prisma.category.findFirst({
      where: {
        id: category,
      },
      select: {
        books: true,
      },
    });
    const books = booksOfCategory.books;
    return {
      books,
      total: total.books.length,
    };
  }
  async getBookByAuthor(author_id: string, skip: number) {
    const authors = await this.prisma.author.findFirst({
      where: {
        id: author_id,
      },
      select: {
        books: {
          include: {
            book: {
              include: {
                prices: true,
                promotions: true,
                category: true,
                publishers: {
                  select: {
                    publisher: true,
                  },
                },
              },
            },
          },
          skip,
          take: this.TAKE,
        },
      },
    });
    const total = await this.prisma.author.findFirst({
      where: {
        id: author_id,
      },
      select: {
        books: true,
      },
    });
    return {
      books: authors.books.map((item) => item.book),
      total: total.books.length,
    };
  }

  async getBookByRating(rating: number, skip: number) {
    const books = await this.prisma.book.findMany({
      where: {
        rating: {
          gte: rating,
          lt: rating + 1,
        },
      },
      include: {
        prices: true,
        promotions: true,
      },
      skip,
      take: this.TAKE,
    });
    const total = await this.prisma.book.count();

    return {
      books,
      total,
    };
  }
}
