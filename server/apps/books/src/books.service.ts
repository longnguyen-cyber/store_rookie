import { QUERY_SORT } from '@app/common';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { BookRepository } from './books.repository';
import { OrderService } from '@app/orders/order.service';

@Injectable()
export class BookService {
  constructor(
    private readonly bookRepository: BookRepository,
    private readonly orderService: OrderService,
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
  }

  async findAll(skip?: number, query?: QUERY_SORT) {
    if (skip !== undefined) {
      const books = await this.bookRepository.findAll(skip, query);
      return {
        books: books.books,
        total: books.total,
      };
    } else {
      const books = await this.bookRepository.findAllAdmin();
      const final = books.map((book) => {
        const lastedPrice = book.prices.find((p) => p.endDate === null);
        return {
          ...book,
          prices: [lastedPrice],
          createdAt: lastedPrice.createdAt,
        };
      });

      return final;
    }
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

  async searchByTitle(title: string) {
    const books = await this.bookRepository.searchByTitle(title);
    const final = books.map((book) => {
      const lastedPrice = book.prices.find((p) => p.endDate === null);
      return {
        ...book,
        prices: [lastedPrice],
        createdAt: lastedPrice.createdAt,
      };
    });
    return final;
  }

  async getBookPopular() {
    const books = await this.orderService.getAllOrderCompletedOfBook();
    return books;
  }

  //shop page
  async getBookByRating(star: number, type: QUERY_SORT, skip: number) {
    const books = await this.bookRepository.getBookByRating(star, skip, type);
    return {
      books: books.books,
      total: books.total,
    };
  }

  async getBookByAuthor(author_id: string, type: QUERY_SORT, skip: number) {
    const books = await this.bookRepository.getBookByAuthor(
      author_id,
      skip,
      type,
    );
    return {
      books: books.books,
      total: books.total,
    };
  }

  async getBookByCategory(category_id: string, type: QUERY_SORT, skip: number) {
    const books = await this.bookRepository.getBookByCategory(
      category_id,
      skip,
      type,
    );

    return {
      books: books.books,
      total: books.total,
    };
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

  async search(q: any) {
    const books = await this.bookRepository.search(q);
    const final = books.map((book) => {
      const lastedPrice = book.prices.find((p) => p.endDate === null);
      return {
        ...book,
        prices: [lastedPrice],
        createdAt: lastedPrice.createdAt,
      };
    });
    return final;
  }
}
