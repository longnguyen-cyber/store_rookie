import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class GatewayResolver {
  @Query(() => String!)
  async healhCheck() {
    return "I'm alive";
  }
}
