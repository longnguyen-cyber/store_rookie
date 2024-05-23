import { InputType, OmitType } from '@nestjs/graphql';
import { ReviewCreateInput } from '../@generated/review/review-create.input';

@InputType()
export class CreateReviewInput extends OmitType(ReviewCreateInput, [
  'createdAt',
  'id',
  'user',
] as const) {}
