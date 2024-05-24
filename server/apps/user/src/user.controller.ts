import { Role, Roles } from '@app/common';
import { AuthGuard } from '@app/common/guards/auth.guard';
import { RolesGuard } from '@app/common/guards/roles.guard';
import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';

@Controller()
// @UseInterceptors(ErrorInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async login(
    @Body() userLoginDto: any,
    @Res({ passthrough: true }) response: Response,
  ) {
    const login = await this.userService.login(userLoginDto);
    response.cookie('token', login.token, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
    });
    return login;
  }

  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async test() {
    return 'test';
  }
}
