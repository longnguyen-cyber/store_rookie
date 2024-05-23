import { Order } from '@app/common/@generated/order/order.model';
import { Query, Resolver } from '@nestjs/graphql';
import { OrderService } from './order.service';

@Resolver()
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @Query(() => [Order])
  async processes() {
    return await this.orderService.findAll();
  }
}
