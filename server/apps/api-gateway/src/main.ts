import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = process.env.API_GATEWAY_SERVICE;
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(PORT, () => {
    console.log(`API Gateway is running on http://localhost:${PORT}`);
  });
}
bootstrap();
