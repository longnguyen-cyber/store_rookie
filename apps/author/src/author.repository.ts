import { PrismaService } from '@app/common';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthorRepository {
  constructor(private readonly prisma: PrismaService) {}
  async findAll() {
    const authors = await this.prisma.author.findMany();
    return authors;
  }

  async findOne(id: string) {
    const author = await this.prisma.author.findUnique({
      where: {
        id: id,
      },
    });
    return author;
  }

  async getBookByAuthor(author_id: string) {
    const authors = await this.prisma.author.findMany({
      where: {
        id: author_id,
      },
      select: {
        books: {
          include: {
            book: {
              include: {
                prices: {
                  orderBy: {
                    createdAt: 'desc',
                  },
                },
                category: true,
                publishers: {
                  select: {
                    publisher: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    const books = authors.flatMap((author) =>
      author.books.map((book) => book.book),
    );
    return books;
  }

  async create(data: any) {
    const author = await this.prisma.author.create({
      data: {
        ...data,
      },
    });
    return author;
  }

  async update(id: string, data: any) {
    const author = await this.prisma.author.update({
      where: {
        id: id,
      },
      data: {
        ...data,
      },
    });
    return author;
  }

  async delete(id: string) {
    const author = await this.prisma.author.delete({
      where: {
        id: id,
      },
    });
    return author;
  }
}
