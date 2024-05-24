import { PrismaService } from '@app/common';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ReviewRepository {
  constructor(private readonly prisma: PrismaService) {}
  async findAll() {
    const reviews = await this.prisma.review.findMany({
      include: {
        book: true,
        user: true,
      },
    });
    return reviews;
  }

  async findOne(id: string) {
    const review = await this.prisma.review.findUnique({
      where: {
        id: id,
      },
    });
    return review;
  }
  async getAllReviewByBookId(bookId: string) {
    const reviews = await this.prisma.review.findMany({
      where: {
        bookId: bookId,
      },
    });
    return reviews;
  }

  async create(data: any) {
    const review = await this.prisma.review.create({
      data: {
        ...data,
      },
    });
    return review;
  }

  async update(id: string, data: any) {
    const review = await this.prisma.review.update({
      where: {
        id: id,
      },
      data: {
        ...data,
      },
    });
    return review;
  }

  async delete(id: string) {
    const review = await this.prisma.review.delete({
      where: {
        id: id,
      },
    });
    return review;
  }
}
