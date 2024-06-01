import { PrismaService } from '@app/common';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PromotionRepository {
  constructor(private readonly prisma: PrismaService) {}
  async findAll() {
    const promotions = await this.prisma.promotion.findMany({
      include: {
        book: {
          include: {
            prices: true,
            authors: {
              select: {
                author: true,
              },
            },
          },
        },
      },
      orderBy: {
        endDate: 'desc',
      },
    });
    return promotions;
  }

  async findOne(id: string) {
    const promotion = await this.prisma.promotion.findUnique({
      where: {
        id: id,
      },
    });
    return promotion;
  }

  async create(data: any) {
    const promotion = await this.prisma.promotion.create({
      data: {
        ...data,
      },
    });
    return promotion;
  }

  async update(id: string, data: any) {
    const promotion = await this.prisma.promotion.update({
      where: {
        id: id,
      },
      data: {
        ...data,
      },
    });
    return promotion;
  }

  async delete(id: string) {
    const promotion = await this.prisma.promotion.delete({
      where: {
        id: id,
      },
    });
    return promotion;
  }

  async search(startDate: Date, endDate: Date) {
    const promotions = await this.prisma.promotion.findMany({
      where: {
        AND: [
          {
            startDate: {
              lte: startDate,
            },
          },
          {
            endDate: {
              gte: endDate,
            },
          },
        ],
      },
    });
    return promotions;
  }
}
