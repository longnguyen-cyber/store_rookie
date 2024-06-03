import {
  AuthGuard,
  ResponseCustom,
  Role,
  Roles,
  RolesGuard,
} from '@app/common';
import { LoginInput, RegisterDTO, ResUserDto } from '@app/common/user';
import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

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

  @Mutation(() => Boolean!)
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.User)
  async logout(@Context() req: any): Promise<boolean> {
    return await this.userService.logout(req.req.token);
  }

  @Mutation(() => Boolean!)
  async register(
    @Args('userCreateDto') userCreateDto: RegisterDTO,
    @Context() req: any,
  ): Promise<boolean> {
    const host = req.req.get('origin');

    const rs = await this.userService.createUser(userCreateDto, host);
    console.log('rs', rs);
    return rs;
  }

  @Mutation(() => Boolean!)
  async verifyEmail(
    @Args('accessToken') accessToken: string,
  ): Promise<boolean> {
    return !!(await this.userService.verifyUser(accessToken));
  }
}
