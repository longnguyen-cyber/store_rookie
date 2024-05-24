import { Field, ObjectType } from '@nestjs/graphql';
import { Category } from '../@generated/category/category.model';
import { Pagination } from '../pagination.dto';

@ObjectType()
export class PaginatedCategoryResponse {
  @Field(() => [Category])
  data: Category[];

  @Field()
  pagination: Pagination;
}
