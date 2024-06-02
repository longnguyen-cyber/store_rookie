import { Query, Resolver } from '@nestjs/graphql';
import { AppService } from './app.service';

@Resolver()
export class GatewayResolver {
  constructor(private readonly appService: AppService) {}
  @Query(() => String!)
  async healhCheck() {
    return "I'm alive";
  }

  @Query(() => String!)
  async getSPA() {
    const spa = await this.appService.getSPA();
    return spa.content;
  }
}
