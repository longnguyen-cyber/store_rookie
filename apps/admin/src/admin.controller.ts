import {
  AuthGuard,
  CloudinaryService,
  CustomValidationPipe,
  Role,
  Roles,
  RolesGuard,
} from '@app/common';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Render,
  Res,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { AdminService, EntityNames } from './admin.service'; // Import the EntityNames type from the admin.service file

@Controller()
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Render('index')
  dashboard() {}

  @Post('login')
  async postLogin(@Body() body: any, @Res() res: Response) {
    const login = await this.adminService.login(body);
    res.cookie('token', login.token, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
    });
    if (login.isAdmin) {
      return res.redirect('/');
    } else {
      return res.redirect('/login');
    }
  }

  @Get('login')
  @Render('auth/login')
  getLogin() {}

  @Post('logout')
  async logout(@Res() res: Response) {
    res.clearCookie('token');
    return res.redirect('/login');
  }

  @Get(':entityName')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async getHello(
    @Param('entityName') entityName: EntityNames,
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Res() res: Response,
  ) {
    if (
      entityName.toString() !== 'login' ||
      entityName.toString() !== 'favicon.ico'
    ) {
      const { data, pagination } = await this.adminService.listRes(
        entityName,
        page,
        limit,
      );

      console.log('Data:', data);
      return res.render('layout', {
        content: `./${entityName}/index`,
        data,
        pagination,
        entityName,
      });
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
    return res.render('layout', {
      content: `./${entityName}/edit`,
      data,
      error: '',
    });
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

  //create
  @Get('create/:entityName')
  async getCreate(
    @Param('entityName') entityName: EntityNames,
    @Res() res: Response,
  ) {
    if (entityName.toString() === 'promotions') {
      const categories = (await this.adminService.getAllCategories()).filter(
        (category) => category.books.length > 0,
      );
      return res.render('layout', {
        content: `./${entityName}/create`,
        data: { categories },
        error: '',
      });
    } else if (entityName.toString() === 'books') {
      const authors = await this.adminService.getAllAuthors();
      const categories = await this.adminService.getAllCategories();
      const publishers = await this.adminService.getAllPublishers();
      return res.render('layout', {
        content: `./${entityName}/create`,
        data: { authors, categories, publishers },
        error: '',
      });
    }
    return res.render('layout', {
      content: `./${entityName}/create`,
      data: {},
      error: '',
    });
  }

  @Post('create/:entityName')
  @UsePipes(new CustomValidationPipe())
  async postCreate(
    @Param('entityName') entityName: EntityNames,
    @Body() body: any,
    @Res() res: Response,
  ) {
    const data = await this.adminService.createRes(entityName, body);
    if (data) {
      return res.redirect(`/${entityName}`);
    } else {
      return res.render(`${entityName}/create`, {
        data: { ...body },
        error: 'Error',
      });
    }
  }

  @Post('uploads')
  @UseInterceptors(FilesInterceptor('file[]', 5))
  async uploadImages(@UploadedFiles() files: Express.Multer.File[]) {
    const rs = await Promise.all(
      files.map((file) => this.cloudinaryService.uploadFile(file)),
    );

    return rs.map((r) => r.url);
  }
}
