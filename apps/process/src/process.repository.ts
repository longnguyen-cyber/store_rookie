import { PrismaService } from '@app/common';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProcessRepository {
  constructor(private readonly prisma: PrismaService) {}
  async findAll() {
    const processes = await this.prisma.order.findMany();
    return processes;
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
