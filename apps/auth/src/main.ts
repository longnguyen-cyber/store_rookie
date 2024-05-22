import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { rateLimit } from 'express-rate-limit';
import * as csurf from 'csurf';
async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  // Apply rate limiting middleware
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  );

  // Apply CSRF protection middleware
  app.use(csurf());
  await app.listen(3010, () => {
    console.log('Auth service is running on port 3010');
  });
}
bootstrap();
