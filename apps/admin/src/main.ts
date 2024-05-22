import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as bodyParser from 'body-parser';
import { join } from 'path';
import { AdminModule } from './admin.module';
import * as cookieParser from 'cookie-parser';
import { HttpExceptionFilter } from '@app/common/common.filter';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AdminModule);

  const viewsPath = join(process.cwd(), 'dist', 'apps', 'admin', 'views');
  app.set('view options', { layout: 'layout' });
  app.setBaseViewsDir(viewsPath);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.setViewEngine('ejs');
  app.enableCors();
  app.use(cookieParser());
  app.use(bodyParser.urlencoded({ extended: true }));
  await app.listen(3001, () => {
    console.log('Admin app is running on http://localhost:3001');
  });
}

bootstrap();
