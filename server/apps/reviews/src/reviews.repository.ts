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
  async getAllReviewByBookId(bookId: string, skip: number, take: number) {
    const reviews = await this.prisma.review.findMany({
      where: {
        bookId: bookId,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
      orderBy: {
        rating: 'desc',
      },
      skip: skip,
      take: take,
    });
    const total = await this.prisma.review.count({
      where: {
        bookId: bookId,
      },
    });
    const totalPage = Math.ceil(total / take);
    return {
      reviews,
      totalPage,
    };
  }

  async create(data: any) {
    const haveBuy = await this.prisma.orderItem.findFirst({
      where: {
        bookId: data.book.connect.id,
      },
    });
    if (!haveBuy) throw new Error('You must buy this book to review it');
    const reviewExist = await this.prisma.review.findFirst({
      where: {
        bookId: data.book.connect.id,
        userId: data.user.connect.id,
      },
    });
    if (reviewExist) throw new Error('You have reviewed this book');

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
        updatedAt: new Date(),
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
