import { Query, Resolver } from '@nestjs/graphql';
import { AppService } from './app.service';

@Resolver()
export class OrderResolver {
  constructor(private readonly appService: AppService) {}

  @Query(() => String!)
  async healhCheck() {
    return "I'm alive";
  }
}
