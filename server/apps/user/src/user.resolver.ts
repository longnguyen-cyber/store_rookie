import { ResponseCustom } from '@app/common';
import { LoginInput, ResUserDto } from '@app/common/user';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  // Note: GraphQL doesn't directly support setting cookies. You would need to handle this on the client side.
  @Mutation(() => ResUserDto)
  async login(
    @Args('userLoginDto') userLoginDto: LoginInput,
  ): Promise<ResponseCustom> {
    const login = await this.userService.login(userLoginDto);
    return login;
  }

  @Query(() => String!)
  async test() {
    return 'Hello World';
  }
}
