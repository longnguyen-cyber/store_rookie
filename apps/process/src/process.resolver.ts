import { Query, Resolver } from '@nestjs/graphql';
import { ProcessService } from './process.service';
import { Order } from '@app/common/@generated/order/order.model';

@Resolver()
export class ProcessResolver {
  constructor(private readonly processService: ProcessService) {}

  @Query(() => [Order])
  async processes() {
    return await this.processService.findAll();
  }
}
