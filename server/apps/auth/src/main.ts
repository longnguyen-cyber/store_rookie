import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
async function bootstrap() {
  const PORT = process.env.AUTH_SERVICE;
  const app = await NestFactory.create(AuthModule);
  // Apply rate limiting middleware

  // Apply CSRF protection middleware
  await app.listen(PORT, () => {
    console.log(`Auth service is running on port http://localhost:${PORT} `);
  });
}
bootstrap();
