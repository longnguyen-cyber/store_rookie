import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoggerService } from '../logger.service';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  constructor(private logger: LoggerService) {} // inject LoggerService

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        this.logger.error(`Error occurred: ${error.message}`, error.stack); // use LoggerService
        return throwError(error);
      }),
    );
  }
}
