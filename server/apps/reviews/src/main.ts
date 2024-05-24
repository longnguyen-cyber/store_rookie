import { NestFactory } from '@nestjs/core';
import { ReviewsModule } from './reviews.module';

async function bootstrap() {
  const PORT = process.env.REVIEW_SERVICE;
  const app = await NestFactory.create(ReviewsModule);
  await app.listen(PORT, () => {
    console.log(`Review service is running on http://localhost:${PORT}`);
  });
}
bootstrap();
