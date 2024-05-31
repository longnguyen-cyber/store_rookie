import { PrismaService } from '@app/common';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PublisherRepository {
  constructor(private readonly prisma: PrismaService) {}
  async findAll() {
    const publishers = await this.prisma.publisher.findMany();
    return publishers;
  }

  async findOne(id: string) {
    const publisher = await this.prisma.publisher.findUnique({
      where: {
        id: id,
      },
    });
    return publisher;
  }

  async create(data: any) {
    const publisher = await this.prisma.publisher.create({
      data: {
        ...data,
      },
    });
    return publisher;
  }

  async search(q: string) {
    const publishers = await this.prisma.publisher.findMany({
      where: {
        name: {
          contains: q,
          mode: 'insensitive',
        },
      },
    });
    return publishers;
  }

  async update(id: string, data: any) {
    const publisher = await this.prisma.publisher.update({
      where: {
        id: id,
      },
      data: {
        ...data,
      },
    });
    return publisher;
  }

  async delete(id: string) {
    const publisher = await this.prisma.publisher.delete({
      where: {
        id: id,
      },
    });
    return publisher;
  }
}
