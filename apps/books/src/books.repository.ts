import { PrismaService } from '@app/common';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BookRepository {
  constructor(private readonly prisma: PrismaService) {}
  async findAll() {
    const books = await this.prisma.book.findMany();
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
        ...data,
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
