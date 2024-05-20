import { Controller, Get, Param, Render, Res } from '@nestjs/common';
import { AdminService, EntityNames } from './admin.service'; // Import the EntityNames type from the admin.service file
import { Response } from 'express';

@Controller()
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  @Render('index')
  dashboard() {
    console.log('Dashboard');
    return { data: 'Hello World!' };
  }

  @Get('login')
  @Render('auth/login')
  getLogin() {}

  @Get(':entityName')
  async getHello(
    @Param('entityName') entityName: EntityNames,
    @Res() res: Response,
  ) {
    const data = await this.adminService.listRes(entityName);
    return res.render(entityName, { data });
  }
}
