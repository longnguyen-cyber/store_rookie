import { InputType, OmitType } from '@nestjs/graphql';
import { OrderCreateInput } from '../@generated/order/order-create.input';

@InputType()
export class CreateOrderInput extends OmitType(OrderCreateInput, [
  'id',
  'user',
  'orderDate',
  'status',
] as const) {}
