import { NestFactory } from '@nestjs/core';
import { AuthorModule } from './author.module';

async function bootstrap() {
  const PORT = process.env.AUTHOR || 3009;
  const app = await NestFactory.create(AuthorModule);
  await app.listen(PORT, () => {
    console.log(
      `author service is running on http://localhost:${PORT}/graphql`,
    );
  });
}
bootstrap();
