import {
  AuthGuard,
  ResponseCustom,
  Role,
  Roles,
  RolesGuard,
} from '@app/common';
import { LoginInput, ResUserDto } from '@app/common/user';
import { UseGuards } from '@nestjs/common';
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

  @Query(() => String)
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async test() {
    return 'test';
  }
}
