import { InputType, OmitType } from '@nestjs/graphql';
import { CartCreateInput } from '../@generated/cart/cart-create.input';

@InputType()
export class CreateCartInput extends OmitType(CartCreateInput, [
  'id',
  'user',
] as const) {}
