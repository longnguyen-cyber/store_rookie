import { NestFactory } from '@nestjs/core';
import { rateLimit } from 'express-rate-limit';
// import * as csurf from 'csurf';
import { UserModule } from './user.module';
import { configureSession } from '@app/common/session.config';
async function bootstrap() {
  const app = await NestFactory.create(UserModule);
  // Apply rate limiting middleware
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  );
  configureSession(app);

  // Apply CSRF protection middleware
  // app.use(csurf());
  await app.listen(3011, () => {
    console.log('User service is running on port 3011');
  });
}
bootstrap();
