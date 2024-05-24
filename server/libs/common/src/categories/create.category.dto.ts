import { InputType, OmitType } from '@nestjs/graphql';
import { CategoryCreateInput } from '../@generated/category/category-create.input';

@InputType()
export class CreateCategoryInput extends OmitType(CategoryCreateInput, [
  'id',
  'books',
] as const) {}
