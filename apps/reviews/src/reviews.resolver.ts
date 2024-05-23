import { AuthGuard, Role, Roles, RolesGuard } from '@app/common';
import { Review } from '@app/common/@generated/review/review.model';
import { CreateReviewInput } from '@app/common/reviews';
import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ReviewsService } from './reviews.service';

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

  @Mutation(() => Boolean!)
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.User)
  async createReview(
    @Args('data') data: CreateReviewInput,
    @Context() req: any,
  ) {
    const rs = await this.reviewsService.create({
      ...data,
      user: {
        connect: {
          id: req.req.user.id,
        },
      },
    });

    return !!rs;
  }
}
