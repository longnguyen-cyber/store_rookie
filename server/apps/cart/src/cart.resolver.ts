import { Role } from '@app/common';
import { CartItemCreateInput } from '@app/common/@generated/cart-item/cart-item-create.input';
import { CartResponseCustom } from '@app/common/cart';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CartService } from './cart.service';

@Resolver()
export class CartResolver {
  constructor(private readonly cartService: CartService) {}

  @Mutation(() => Boolean!)
  async addItemToCart(
    @Args('items') data: CartItemCreateInput,
    @Args('userId') userId: string,
    @Args('type') type: string,
  ) {
    return await this.cartService.addItemToCart(
      {
        ...data,
      },
      userId,
      type as Role,
    );
  }

  @Mutation(() => Boolean!)
  async removeItemFromCart(@Args('id') id: string) {
    return await this.cartService.removeItemFromCart(id);
  }

  @Query(() => CartResponseCustom)
  async getCart(@Args('id') id: string) {
    return await this.cartService.getCart(id);
  }

  // @Mutation(() => Boolean!)
  // async createCart(@Args('data') data: CreateCartInput) {
  //   return await this.cartService.createCart(data);
  // }
}
