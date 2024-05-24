import * as session from 'express-session';
import { INestApplication } from '@nestjs/common';

export function configureSession(app: INestApplication) {
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: { secure: true },
    }),
  );
}
