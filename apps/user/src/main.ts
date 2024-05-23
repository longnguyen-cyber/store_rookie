import { NestFactory } from '@nestjs/core';
// import * as csurf from 'csurf';
import { UserModule } from './user.module';
async function bootstrap() {
  const app = await NestFactory.create(UserModule);
  // Apply rate limiting middleware

  // Apply CSRF protection middleware
  await app.listen(3011, () => {
    console.log('User service is running on port 3011');
  });
}
bootstrap();
