import { PrismaService } from '@app/common';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BookRepository {
  constructor(private readonly prisma: PrismaService) {}
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

  async findOne(id: string) {
    const book = await this.prisma.book.findUnique({
      where: {
        id: id,
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

      take: 200,
    });
    return books;
  }

  async getBookByRating(rating: number) {
    const books = await this.prisma.book.findMany({
      where: {
        rating: {
          gte: rating,
          lt: rating + 1,
        },
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
}
