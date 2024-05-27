import { Field, ObjectType } from '@nestjs/graphql';
import { Review } from '../@generated/review/review.model';

@ObjectType()
export class ReviewResponseCustom {
  @Field(() => [Review])
  reviews: Review[];

  @Field()
  totalPage: number;
}
