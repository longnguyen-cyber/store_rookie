import { Order } from '@app/common/@generated/order/order.model';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { OrderService } from './order.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard, Role, Roles, RolesGuard } from '@app/common';
import { CreateOrderInput, OrderResponseCustom } from '@app/common/orders';

@Resolver()
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @Query(() => [OrderResponseCustom])
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.User)
  async orders(@Context() req: any) {
    return (await this.orderService.findAll()).filter(
      (order) => order.userId === req.req.user.id,
    );
  }

  @Mutation(() => Order)
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.User)
  async createOrder(
    @Args('data') data: CreateOrderInput,
    @Args('guestId') guestId: string,
    @Context() req: any,
  ) {
    return await this.orderService.create(
      {
        ...data,
        user: {
          connect: {
            id: req.req.user.id,
          },
        },
      },
      guestId,
      req.req.user,
    );
  }
}
