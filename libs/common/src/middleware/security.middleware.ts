import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggerService } from '../logger.service';

@Injectable()
export class SecurityMiddleware implements NestMiddleware {
  constructor(
    private readonly logger: LoggerService, // inject LoggerService
  ) {}
  use(req: Request, res: Response, next: NextFunction) {
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Content-Security-Policy', "default-src 'self'");
    this.logger.log(`Incoming request: ${req.method} ${req.url}`);
    next();
  }
}
