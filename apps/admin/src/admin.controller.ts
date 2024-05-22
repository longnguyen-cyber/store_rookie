import { CloudinaryService, CustomValidationPipe } from '@app/common';
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
  @Render('index')
  dashboard() {
    return { data: 'Hello World!' };
  }
  @Post('login')
  async postLogin(@Body() body: any, @Res() res: Response) {
    console.log('Body:', body);
    if (body.username === 'admin' && body.password === 'admin') {
      return res.redirect('/books');
    } else {
      return res.render('auth/login', {
        error: 'Invalid username or password',
      });
    }
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
      const genres = await this.adminService.getAllGerne();
      return res.render('layout', {
        content: `./${entityName}/create`,
        data: { genres },
        error: '',
      });
    } else if (entityName.toString() === 'books') {
      const authors = await this.adminService.getAllAuthors();
      const categories = await this.adminService.getAllCategories();
      const genres = await this.adminService.getAllGerne();
      const publishers = await this.adminService.getAllPublishers();
      return res.render('layout', {
        content: `./${entityName}/create`,
        data: { authors, categories, genres, publishers },
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
