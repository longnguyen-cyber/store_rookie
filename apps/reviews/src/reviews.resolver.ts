import { Args, Query, Resolver } from '@nestjs/graphql';
import { ReviewsService } from './reviews.service';
import { Review } from '@app/common/@generated/review/review.model';

@Resolver()
export class ReviewsResolver {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Query(() => [Review])
  async reviews() {
    return await this.reviewsService.findAll();
  }

  @Query(() => [Review])
  async reviewsByBookId(@Args('bookId') bookId: string) {
    return await this.reviewsService.getAllReviewByBookId(bookId);
  }
}
