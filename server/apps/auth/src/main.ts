import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  // Apply rate limiting middleware

  // Apply CSRF protection middleware
  await app.listen(3010, () => {
    console.log('Auth service is running on port 3010');
  });
}
bootstrap();
