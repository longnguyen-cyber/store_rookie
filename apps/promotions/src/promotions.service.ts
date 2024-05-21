import { Injectable } from '@nestjs/common';
import { PromotionRepository } from './promotions.repository';

@Injectable()
export class PromotionsService {
  constructor(private readonly promotionRepository: PromotionRepository) {}

  async findAll() {
    return await this.promotionRepository.findAll();
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
}
