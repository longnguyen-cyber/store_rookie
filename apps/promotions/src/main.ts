import { NestFactory } from '@nestjs/core';
import { PromotionsModule } from './promotions.module';

async function bootstrap() {
  const PORT = process.env.PROMOTION || 3006;
  const app = await NestFactory.create(PromotionsModule);
  await app.listen(PORT, () => {
    console.log(
      `Promotion service is running on http://localhost:${PORT}/graphql`,
    );
  });
}
bootstrap();
