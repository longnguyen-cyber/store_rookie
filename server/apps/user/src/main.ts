import { NestFactory } from '@nestjs/core';
// import * as csurf from 'csurf';
import { UserModule } from './user.module';
async function bootstrap() {
  const PORT = process.env.USER_SERVICE;
  const app = await NestFactory.create(UserModule);
  // Apply rate limiting middleware

  // Apply CSRF protection middleware
  await app.listen(PORT, () => {
    console.log(`User service is running on port http://localhost:${PORT}`);
  });
}
bootstrap();
