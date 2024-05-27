import { NestFactory } from '@nestjs/core';
import { CartModule } from './cart.module';

async function bootstrap() {
  const PORT = process.env.CART_SERVICE;
  const app = await NestFactory.create(CartModule);
  await app.listen(PORT, () => {
    console.log(`Cart service is running on: ${PORT}`);
  });
}
bootstrap();
