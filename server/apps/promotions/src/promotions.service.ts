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
    const booksSale = (await this.findAll()).filter((item) => {
      const currentDate = new Date();
      return item.endDate >= currentDate;
    });

    return booksSale;
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
    const startDate = q.startDate;
    const endDate = q.endDate;
    return await this.promotionRepository.search(startDate, endDate);
  }
}
