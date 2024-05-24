import { NestFactory } from '@nestjs/core';
import { CategoriesModule } from './categories.module';

async function bootstrap() {
  const PORT = process.env.CATEGORY_SERVICE;
  const app = await NestFactory.create(CategoriesModule);
  await app.listen(PORT, () => {
    console.log(`Category service is running on http://localhost:${PORT}`);
  });
}
bootstrap();
