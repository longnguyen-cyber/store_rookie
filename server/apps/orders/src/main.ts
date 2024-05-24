import { NestFactory } from '@nestjs/core';
import { OrderModule } from './order.module';

async function bootstrap() {
  const PORT = process.env.PROCESS || 3005;
  const app = await NestFactory.create(OrderModule);
  await app.listen(PORT, () => {
    console.log(`Order service is running on http://localhost:${PORT}/graphql`);
  });
}
bootstrap();
