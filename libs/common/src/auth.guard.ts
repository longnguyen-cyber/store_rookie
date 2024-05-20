import { HttpExceptionCustom } from '@app/common';
import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@Inject() private cacheManager: Cache) {}
  async canActivate(context: ExecutionContext) {
    const url = context.switchToHttp().getRequest().url;
    const request = context.switchToHttp().getRequest();

    if (url === '/api/users/login') {
      request.error = {
        message: 'Token expired or incorrect',
        status: HttpStatus.UNAUTHORIZED,
      };

      return true;
    } else {
      let token = request.cookies !== undefined ? request.cookies.token : null;
      if (!token) {
        token =
          request.headers !== undefined
            ? request.headers.authorization !== undefined &&
              request.headers.authorization.split(' ')[1]
            : request.handshake.headers.authorization
              ? request.handshake.headers.authorization
              : request.handshake.auth.Authorization.split(' ')[1];
      }
      const whiteList = ['/api/users/login', '/api/users/register'];
      if (!token) {
        request.error = {
          message: 'Token expired or incorrect!!!',
          status: HttpStatus.UNAUTHORIZED,
        };
        throw new HttpException(
          "Oops! It seems like there's an issue with your access token. It may be invalid, missing, or expired. Please try again.",
          HttpStatus.FORBIDDEN,
        );
      } else if (!token && !whiteList.includes(url)) {
        request.error = {
          message: 'Token expired or incorrect',
          status: HttpStatus.UNAUTHORIZED,
        };
        throw new HttpException(
          "Oops! It seems like there's an issue with your access token. It may be invalid, missing, or expired. Please try again.",
          HttpStatus.FORBIDDEN,
        );
      }
      if (token) {
        const user = await this.cacheManager.get(token);
        const parsedUser = JSON.parse(user as any);
        try {
          if (!parsedUser) {
            request.error = {
              message: 'Token expired or incorrect',
              status: HttpStatus.UNAUTHORIZED,
            };
            return true;
          } else {
            request.token = token;
            request.user = parsedUser;
            return true;
          }
        } catch (error) {
          throw new HttpExceptionCustom(
            'Token expired or incorrect',
            HttpStatus.UNAUTHORIZED,
          );
        }
      } else {
        request.error = {
          message: 'Token expired or incorrect',
          status: HttpStatus.UNAUTHORIZED,
        };
        return true;
      }
    }
  }
}
