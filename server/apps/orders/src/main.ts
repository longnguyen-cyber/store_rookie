import { NestFactory } from '@nestjs/core';
import { OrderModule } from './order.module';

async function bootstrap() {
  const PORT = process.env.ORDER_SERVICE;
  const app = await NestFactory.create(OrderModule);
  await app.listen(PORT, () => {
    console.log(`Order service is running on http://localhost:${PORT}`);
  });
}
bootstrap();
