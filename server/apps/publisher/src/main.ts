import { NestFactory } from '@nestjs/core';
import { PublisherModule } from './publisher.module';

async function bootstrap() {
  const PORT = process.env.PUBLISHER || 3008;
  const app = await NestFactory.create(PublisherModule);
  await app.listen(PORT, () => {
    console.log(
      `Publisher service is running on http://localhost:${PORT}/graphql`,
    );
  });
}
bootstrap();
