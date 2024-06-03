import { Injectable } from '@nestjs/common';
import { PromotionRepository } from './promotions.repository';

@Injectable()
export class PromotionsService {
  constructor(private readonly promotionRepository: PromotionRepository) {}

  async findAll() {
    const rs = await this.promotionRepository.findAll();
    const final = rs.map((item) => {
      const prices = item.book.prices.find((price) => price.endDate === null);

      return {
        ...item,
        book: {
          ...item.book,
          prices: [prices],
        },
      };
    });

    return final;
  }

  //compare with end date and current date to get books on sale
  async getOnSaleByCurrentDate() {
    const allBooks = await this.findAll();
    const booksSale = allBooks.filter((item) => {
      const currentDate = new Date();
      return item.endDate >= currentDate;
    });

    const distinctBooksSale = booksSale.reduce((unique, book) => {
      return unique.some((u) => u.bookId === book.bookId)
        ? unique
        : [...unique, book];
    }, []);
    return distinctBooksSale;
  }

  async findOne(id: string) {
    return await this.promotionRepository.findOne(id);
  }

  async create(data: any) {
    return await this.promotionRepository.create(data);
  }

  async update(id: string, data: any) {
    return await this.promotionRepository.update(id, data);
  }

  async delete(id: string) {
    return await this.promotionRepository.delete(id);
  }

  async search(q: any) {
    const [startDate, endDate] = q.split('/');

    return await this.promotionRepository.search(startDate, endDate);
  }
}
