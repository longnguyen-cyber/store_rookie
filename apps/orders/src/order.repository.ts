import { PrismaService } from '@app/common';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderRepository {
  constructor(private readonly prisma: PrismaService) {}
  async findAll() {
    const orders = await this.prisma.order.findMany();
    return orders;
  }

  async getAllOrderCompletedOfBook() {
    const orders = await this.prisma.order.findMany({
      where: {
        status: 'Completed',
      },
      include: {
        items: {
          select: {
            book: true,
          },
        },
      },
      take: 200,
    });
    const books = orders.flatMap((order) =>
      order.items.map((item) => item.book),
    );
    return books;
  }

  async findOne(id: string) {
    const order = await this.prisma.order.findUnique({
      where: {
        id: id,
      },
    });
    return order;
  }

  async create(data: any) {
    const order = await this.prisma.order.create({
      data: {
        ...data,
      },
    });
    return order;
  }

  async update(id: string, data: any) {
    const order = await this.prisma.order.update({
      where: {
        id: id,
      },
      data: {
        ...data,
      },
    });
    return order;
  }

  async delete(id: string) {
    const order = await this.prisma.order.delete({
      where: {
        id: id,
      },
    });
    return order;
  }
}
