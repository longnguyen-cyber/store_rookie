import { NestFactory } from '@nestjs/core';
import { BooksModule } from './books.module';

async function bootstrap() {
  const PORT = process.env.BOOK || 3004;
  const app = await NestFactory.create(BooksModule);
  await app.listen(PORT, () => {
    console.log(`book service is running on http://localhost:${PORT}/graphql`);
  });
}
bootstrap();
