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

  async create(data: any) {
    const author = await this.prisma.author.create({
      data: {
        ...data,
      },
    });
    return author;
  }
  async search(q: string) {
    const authors = await this.prisma.author.findMany({
      where: {
        OR: [
          {
            name: {
              contains: q,
              mode: 'insensitive',
            },
          },
          {
            bio: {
              contains: q,
              mode: 'insensitive',
            },
          },
        ],
      },
    });
    return authors;
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
