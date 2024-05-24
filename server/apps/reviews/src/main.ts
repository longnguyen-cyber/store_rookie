import { NestFactory } from '@nestjs/core';
import { ReviewsModule } from './reviews.module';

async function bootstrap() {
  const PORT = process.env.REVIEW || 3007;
  const app = await NestFactory.create(ReviewsModule);
  await app.listen(PORT, () => {
    console.log(
      `Review service is running on http://localhost:${PORT}/graphql`,
    );
  });
}
bootstrap();
