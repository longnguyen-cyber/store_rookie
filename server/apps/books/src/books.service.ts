import { FilterBookDto } from '@app/common/book';
import { OrderService } from '@app/orders/order.service';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { BookRepository } from './books.repository';

@Injectable()
export class BookService {
  constructor(
    private readonly bookRepository: BookRepository,
    private readonly orderService: OrderService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT, {
    name: 'update book rating',
  })
  async handleCronRating() {
    const books = await this.bookRepository.getBooksForCronRating();
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

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT, {
    name: 'update book price',
  })
  async handleCronPrice() {
    const books = await this.bookRepository.getBooksForCronPrice();
    //check with new Date
    const currentDate = new Date();
    books.forEach((item) => {
      if (item.endDate < currentDate) {
        this.bookRepository.createBookPrice(item.bookId, {
          originalPrice: item.originalPrice,
        });
      }
    });
  }

  async findAll() {
    const books = await this.bookRepository.findAllAdmin();
    return books;
  }

  async createBookPricePromotion(data: any) {
    const price = await this.bookRepository.createBookPricePromotion(data);
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
  async booksFilter(filter: FilterBookDto) {
    const books = await this.bookRepository.findByFilter(filter);
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
