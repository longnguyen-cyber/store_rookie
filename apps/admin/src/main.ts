import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as hbs from 'hbs';
import { AdminModule } from './admin.module';
import * as bodyParser from 'body-parser';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AdminModule);

  const viewsPath = join(process.cwd(), 'dist', 'apps', 'admin', 'views');
  app.setBaseViewsDir(viewsPath);

  app.use(bodyParser.urlencoded({ extended: true }));
  // Register the partials
  hbs.registerPartials(join(viewsPath, 'partials'));
  hbs.registerHelper('increment', function (value) {
    return parseInt(value) + 1;
  });
  hbs.registerHelper('eq', function (a, b) {
    return a === b;
  });
  app.setViewEngine('hbs');
  app.set('view options', { layout: 'layout' });
  await app.listen(3001, () => {
    console.log('Admin app is running on http://localhost:3001');
  });
}

bootstrap();
