import { Field, InputType, OmitType } from '@nestjs/graphql';
import { ReviewCreateInput } from '../@generated/review/review-create.input';

@InputType()
export class CreateReviewInput extends OmitType(ReviewCreateInput, [
  'createdAt',
  'user',
] as const) {
  @Field(() => Boolean)
  isEdit: boolean;
}
