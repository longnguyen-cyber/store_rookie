import { PrismaService } from '@app/common';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoriesRepository {
  constructor(private readonly prisma: PrismaService) {}
  async findAll() {
    const categories = await this.prisma.category.findMany({
      include: {
        books: true,
      },
    });
    return categories;
  }

  async getBookByCategory(category: string) {
    const books = await this.prisma.category.findMany({
      where: {
        id: category,
      },
      select: {
        books: {
          include: {
            prices: {
              orderBy: {
                createdAt: 'desc',
              },
            },
          },
        },
      },
    });
    return books;
  }

  async findOne(id: string) {
    const category = await this.prisma.category.findUnique({
      where: {
        id: id,
      },
    });
    return category;
  }

  async create(data: any) {
    const category = await this.prisma.category.create({
      data: {
        ...data,
      },
    });
    return category;
  }

  async update(id: string, data: any) {
    const category = await this.prisma.category.update({
      where: {
        id: id,
      },
      data: {
        ...data,
      },
    });
    return category;
  }

  async delete(id: string) {
    const category = await this.prisma.category.delete({
      where: {
        id: id,
      },
    });
    return category;
  }
}
