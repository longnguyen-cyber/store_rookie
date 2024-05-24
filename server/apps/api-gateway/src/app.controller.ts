import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AppService } from './app.service';
import { Order } from '@app/common/@generated/order/order.model';
import { OrderCreateInput } from '@app/common/@generated/order/order-create.input';

@Resolver()
export class OrderResolver {
  constructor(private readonly appService: AppService) {}

  @Query(() => [Order])
  async orders() {}

  @Mutation(() => String)
  createOrder(@Args('createOrderInput') createOrderInput: OrderCreateInput) {
    console.log(createOrderInput);
    return 'Order created';
  }
}
