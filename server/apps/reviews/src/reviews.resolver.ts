import { AuthGuard, Role, Roles, RolesGuard } from '@app/common';
import { Review } from '@app/common/@generated/review/review.model';
import { CreateReviewInput } from '@app/common/reviews';
import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ReviewsService } from './reviews.service';
import { ReviewResponseCustom } from '@app/common/reviews/response.review.dto';

@Resolver()
export class ReviewsResolver {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Query(() => [Review])
  async reviews() {
    return await this.reviewsService.findAll();
  }

  @Query(() => ReviewResponseCustom)
  async reviewsByBook(
    @Args('bookId') bookId: string,
    @Args('skip', { type: () => String, nullable: true }) skip: string,
    @Args('take', { type: () => String, nullable: true }) take: string,
  ) {
    const rs = await this.reviewsService.getAllReviewByBookId(
      bookId,
      parseInt(skip),
      parseInt(take),
    );
    return rs;
  }

  @Mutation(() => Boolean!)
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.User)
  async createReview(
    @Args('data') data: CreateReviewInput,
    @Context() req: any,
  ) {
    if (data.isEdit) {
      delete data.isEdit;
      return !!(await this.reviewsService.update(data.id, data));
    } else {
      delete data.id;
      delete data.isEdit;
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
}
