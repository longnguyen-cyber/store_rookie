import { NestFactory } from '@nestjs/core';
import { PublisherModule } from './publisher.module';

async function bootstrap() {
  const PORT = process.env.PUBLISHER_SERVICE;
  const app = await NestFactory.create(PublisherModule);
  await app.listen(PORT, () => {
    console.log(`Publisher service is running on http://localhost:${PORT}`);
  });
}
bootstrap();
