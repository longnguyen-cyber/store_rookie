import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Render,
  Res,
} from '@nestjs/common';
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
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Res() res: Response,
  ) {
    if (
      entityName.toString() !== 'login' ||
      entityName.toString() !== ' favicon.ico'
    ) {
      console.log('EntityName:', entityName);
      const { data, pagination } = await this.adminService.listRes(
        entityName,
        page,
        limit,
      );
      console.log('Data:', data);
      console.log('Pagination:', pagination);
      return res.render(entityName, { data, pagination, entityName });
    }
  }

  //delete
  @Post('delete/:entityName/:id')
  async deleteEntity(
    @Param('entityName') entityName: EntityNames,
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    await this.adminService.deleteRes(entityName, id);
    return res.redirect(`/${entityName}`);
  }

  @Get('edit/:entityName/:id')
  async getEdit(
    @Param('entityName') entityName: EntityNames,
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    const data = await this.adminService.getRes(entityName, id);
    console.log('Data:', data);
    return res.render(`${entityName}/edit`, { data });
  }

  @Post('edit/:entityName/:id')
  async postEdit(
    @Param('entityName') entityName: EntityNames,
    @Param('id') id: string,
    @Body() body: any,
    @Res() res: Response,
  ) {
    console.log('Body:', body);
    console.log('EntityName:', entityName);
    console.log('Id:', id);
    const data = await this.adminService.updateRes(entityName, id, body);
    if (data) {
      return res.redirect(`/${entityName}`);
    } else {
      return res.render(`${entityName}/edit`, {
        data: { ...body, id },
        error: 'Error',
      });
    }
  }
}
