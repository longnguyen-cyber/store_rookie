import { Field, ObjectType } from '@nestjs/graphql';
import { Order } from '../@generated/order/order.model';

@ObjectType()
export class OrderResponseCustom extends Order {
  @Field()
  total: string;
}
