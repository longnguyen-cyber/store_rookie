import { QUERY_SORT } from '@app/common';
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

  async findAll(skip: number) {
    const books = await this.bookRepository.findAll(skip);
    const final = books.books.map((book) => {
      const lastedPrice = book.prices.find((p) => p.endDate === null);
      return {
        ...book,
        prices: [lastedPrice],
        createdAt: lastedPrice.createdAt,
      };
    });
    return {
      books: final,
      total: books.total,
    };
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

  async getBookPopular() {
    const books = await this.orderService.getAllOrderCompletedOfBook();
    return books;
  }

  private sortByPrice(books: any, type: QUERY_SORT) {
    if (type === QUERY_SORT.ASC) {
      return books.sort(
        (a, b) => a.prices[0].originalPrice - b.prices[0].originalPrice,
      );
    } else {
      return books.sort(
        (a, b) => b.prices[0].originalPrice - a.prices[0].originalPrice,
      );
    }
  }
  private cleanData = (data: any) => {
    const final = data.map((book) => {
      const lastedPrice = book.prices.find((p) => p.endDate === null);
      const lastPromotion = book.promotions.sort(
        (a, b) => new Date(b.endDate).getTime() - new Date(a.endDate).getTime(),
      )[0];
      return {
        ...book,
        prices: [lastedPrice],
        createdAt: lastedPrice.createdAt,
        promotions: lastPromotion ? [lastPromotion] : [],
      };
    });

    return final;
  };

  async sortOrFilterBooks(books: any, type: QUERY_SORT) {
    const cleanData = this.cleanData(books);
    switch (type) {
      case QUERY_SORT.ASC:
      case QUERY_SORT.DESC:
        return this.sortByPrice(cleanData, type);
      case QUERY_SORT.SALE:
        return cleanData.filter((book) => book.promotions.length > 0);
      case QUERY_SORT.POPULAR:
        const popularBooks = await this.getBookPopular();
        if (!popularBooks.length) {
          return [];
        }

        const final = popularBooks
          .map((book) => {
            const b = cleanData.find((b) => b.id === book.id);
            return b;
          })
          .filter(Boolean);
        console.log('final', final);
        return final;

      default:
        return cleanData;
    }
  }

  //shop page
  async getBookByRating(star: number, type: QUERY_SORT, skip: number) {
    const books = await this.bookRepository.getBookByRating(star, skip);
    return {
      books: this.sortOrFilterBooks(books.books, type),
      total: books.total,
    };
  }

  async getBookByAuthor(author_id: string, type: QUERY_SORT, skip: number) {
    const books = await this.bookRepository.getBookByAuthor(author_id, skip);

    return {
      books: await this.sortOrFilterBooks(books.books, type),
      total: books.total,
    };
  }

  async getBookByCategory(category_id: string, type: QUERY_SORT, skip: number) {
    const books = await this.bookRepository.getBookByCategory(
      category_id,
      skip,
    );

    return {
      books: this.sortOrFilterBooks(books.books, type),
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
}
