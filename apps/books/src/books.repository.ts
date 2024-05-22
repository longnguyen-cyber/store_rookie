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

  async getAllGerne() {
    const genres = await this.prisma.book.findMany({
      select: {
        genre: true,
      },
    });
    return genres;
  }

  async getBookByGenre(genre: string) {
    const books = await this.prisma.book.findMany({
      where: {
        genre: genre,
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
    console.log(data);
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
        title: data.title,
        genre: data.genre,
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
