import { Field, ObjectType } from '@nestjs/graphql';
import { Cart } from '../@generated/cart/cart.model';

@ObjectType()
export class CartResponseCustom extends Cart {
  @Field()
  total: string;
}
