import { Injectable } from '@nestjs/common';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrderService {
  constructor(private readonly orderRepository: OrderRepository) {}

  async findAll(userId: string) {
    return await this.orderRepository.findAll(userId);
  }

  async findOne(id: string) {
    return await this.orderRepository.findOne(id);
  }

  async create(data: any, guestId: string) {
    return await this.orderRepository.create(data, guestId);
  }

  async update(id: string, data: any) {
    return await this.orderRepository.update(id, data);
  }

  async delete(id: string) {
    return await this.orderRepository.delete(id);
  }

  async getAllOrderCompletedOfBook() {
    return await this.orderRepository.getAllOrderCompletedOfBook();
  }
}
