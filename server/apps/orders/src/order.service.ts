import { Injectable } from '@nestjs/common';
import { OrderRepository } from './order.repository';
import { InjectQueue } from '@nestjs/bull';
import { Queue as QueueEmail } from 'bull';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    @InjectQueue('queue')
    private readonly mailQueue: QueueEmail,
  ) {}

  async findAll() {
    return await this.orderRepository.findAll();
  }

  async findOne(id: string) {
    return await this.orderRepository.findOne(id);
  }

  async create(data: any, id?: string, user?: any) {
    const rs = await this.orderRepository.create(data, id);
    if (rs) {
      await this.mailQueue.add(
        'checkout',
        {
          to: user.email,
          username: user.username,
          order_id: rs.id,
        },
        {
          removeOnComplete: true,
        },
      );
      return rs;
    }
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

  async search(q: any) {
    return 'Incomming' + q;
  }
}
