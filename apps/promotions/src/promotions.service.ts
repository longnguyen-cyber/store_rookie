import { Injectable } from '@nestjs/common';
import { PromotionRepository } from './promotions.repository';

@Injectable()
export class PromotionsService {
  constructor(private readonly promotionRepository: PromotionRepository) {}

  async findAll() {
    const rs = await this.promotionRepository.findAll();
    const final = rs.map((item) => {
      // item.startDate = this.formatTimeVi(item.startDate);
      // item.end_time = this.formatTimeVi(item.end_time);

      return {
        ...item,
        // startDate: this.formatTimeVi(item.startDate),
        // endDate: this.formatTimeVi(item.endDate),
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

  private formatTimeVi(time: Date) {
    const date = new Date(time);
    let day: any = date.getDate();
    let month: any = date.getMonth() + 1;
    const year = date.getFullYear();
    let hour: any = date.getHours() - 7;
    let minute: any = date.getMinutes();
    if (day < 10) {
      day = `0${day}`;
    }
    if (month < 10) {
      month = `0${month}`;
    }
    if (hour < 10) {
      hour = `0${hour}`;
    }
    if (minute < 10) {
      minute = `0${minute}`;
    }

    return `${day}/${month}/${year} ${hour}:${minute}`;
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
}
