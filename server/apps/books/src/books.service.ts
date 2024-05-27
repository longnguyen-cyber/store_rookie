import { QUERY_ORDER } from '@app/common';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { AuthorService } from 'apps/author/src/author.service';
import { CategoriesService } from 'apps/categories/src/categories.service';
import { OrderService } from 'apps/orders/src/order.service';
import { BookRepository } from './books.repository';

@Injectable()
export class BookService {
  constructor(
    private readonly bookRepository: BookRepository,
    private readonly categoriesService: CategoriesService,
    private readonly orderService: OrderService,
    private readonly authorService: AuthorService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT, {
    name: 'update book rating',
  })
  async handleCron() {
    const books = await this.bookRepository.getBooksForCron();
    books.forEach((item) => {
      const sumReviewOfBook = item.reviews.length;
      const totalStar = item.reviews.reduce((acc, cur) => acc + cur.rating, 0);
      const rating = parseFloat((totalStar / sumReviewOfBook).toFixed(1));
      const ratings = Array(5).fill(0);
      const reviews = item.reviews;
      reviews.forEach((review) => {
        ratings[review.rating - 1]++;
      });

      this.bookRepository.update(item.id, {
        rating,
        ratings,
      });
    });
    console.log('Update book rating');
  }

  async findAll() {
    const books = await this.bookRepository.findAll();
    const final = books.map((book) => {
      const lastedPrice = book.prices.find((p) => p.endDate === null);
      console.log(lastedPrice);
      return {
        ...book,
        prices: [lastedPrice],
        createdAt: lastedPrice.createdAt,
      };
    });
    return final;
  }

  async getBookByCategory(category_id: string) {
    const books = await this.categoriesService.getBookByCategory(category_id);
    return books;
  }

  async createBookPrice(data: any) {
    const price = await this.bookRepository.createBookPrice(data);
    return price;
  }

  async getRecommendBooks() {
    const books = await this.bookRepository.getRecommendBooksByRating();
    const final = books.map((item) => {
      const prices = item.prices.find((price) => price.endDate === null);

      return {
        ...item,
        prices: [prices],
      };
    });

    return final;
  }

  async getBookByPrice(type: QUERY_ORDER) {
    const books = await this.findAll();
    if (type === QUERY_ORDER.ASC) {
      return books.sort(
        (a, b) => a.prices[0].originalPrice - b.prices[0].originalPrice,
      );
    } else {
      return books.sort(
        (a, b) => b.prices[0].originalPrice - a.prices[0].originalPrice,
      );
    }
  }

  async getBookByRating(star: number) {
    const books = await this.bookRepository.getBookByRating(star);
    return books;
  }

  async getBookPopular() {
    const books = await this.orderService.getAllOrderCompletedOfBook();
    return books;
  }

  async getBookByAuthor(author_id: string) {
    const books = await this.authorService.getBookByAuthor(author_id);
    return books;
  }

  async findOne(id: string) {
    const book = await this.bookRepository.findOne(id);
    const prices = book.prices.find((price) => price.endDate === null);
    const ratingsReserve = [
      ...JSON.parse(JSON.stringify(book.ratings)),
    ].reverse();

    return {
      ...book,
      ratings: ratingsReserve,
      prices: [prices],
    };
  }

  async create(data: any) {
    const book = await this.bookRepository.create(data);
    return book;
  }

  async update(id: string, data: any) {
    const book = await this.bookRepository.update(id, data);
    return book;
  }

  async delete(id: string) {
    const book = await this.bookRepository.delete(id);
    return book;
  }
}
