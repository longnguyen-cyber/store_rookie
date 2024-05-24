import { Query, Resolver } from '@nestjs/graphql';
import { PromotionsService } from './promotions.service';
import { Promotion } from '@app/common/@generated/promotion/promotion.model';

@Resolver()
export class PromotionsResolver {
  constructor(private readonly promotionsService: PromotionsService) {}

  @Query(() => [Promotion])
  async promotions() {
    return await this.promotionsService.findAll();
  }

  @Query(() => [Promotion])
  async promotionsOnSale() {
    return await this.promotionsService.getOnSaleByCurrentDate();
  }
}
