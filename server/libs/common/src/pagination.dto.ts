import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Pagination {
  @Field()
  nextPage: string;

  @Field()
  prevPage: string;

  @Field(() => [Number])
  pages: number[];

  @Field()
  currentPage: number;
}
