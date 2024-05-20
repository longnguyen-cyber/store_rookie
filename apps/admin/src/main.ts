import { NestFactory } from '@nestjs/core';
import { AdminModule } from './admin.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as hbs from 'hbs';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AdminModule);
  app.setBaseViewsDir(join(process.cwd(), 'dist', 'apps', 'admin', 'views'));

  // Register the partials
  hbs.registerPartials(join(__dirname, 'views/partials'));
  app.setViewEngine('hbs');
  await app.listen(3000);
}
bootstrap();
