import { CACHE_SERVICE } from '@app/cache';
import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthService } from 'apps/auth/src/auth.service';
import { Cache } from 'cache-manager';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(CACHE_SERVICE) private cacheManager: Cache,
    private readonly authService: AuthService,
  ) {}

  private getAccessToken(context: ExecutionContext) {
    const gqlContext = GqlExecutionContext.create(context);
    const req =
      gqlContext.getType() == 'graphql'
        ? gqlContext.getContext().req
        : context.switchToHttp().getRequest<Request>();
    return req.headers.authorization.split(' ')[1];
  }
  async canActivate(context: ExecutionContext) {
    const gqlContext = GqlExecutionContext.create(context);
    const isGraphql = gqlContext.getType() === 'graphql';
    const request = isGraphql
      ? gqlContext.getContext().req
      : context.switchToHttp().getRequest();

    const url = request.url;
    let token = isGraphql
      ? this.getAccessToken(context)
      : request.cookies?.token;
    if (!token) {
      token = request.headers?.authorization?.split(' ')[1];
    }
    if (url === '/' && !token) {
      return true;
    }

    if (!token) {
      console.log('Token not found');
      const response = context.switchToHttp().getResponse();
      response.redirect('/login');
      return false;
    }

    // const decoded = this.authService.decodeJWT(token);
    // if (!decoded) {
    //   this.throwTokenError(request);
    // }

    try {
      const decoded = this.authService.decodeJWT(token);
      // ... (rest of your guard logic)
      if (!decoded) {
        this.throwTokenError(request);
      }
    } catch (error) {
      request.error = error.response;
      const response = context.switchToHttp().getResponse();
      response.redirect('/login');
      return false;
    }
    const user = await this.cacheManager.get(token);
    const parsedUser = JSON.parse(user as any);
    if (!parsedUser) {
      this.throwTokenError(request);
    }

    request.token = token;
    request.user = parsedUser;
    return true;
  }

  private throwTokenError(request: any) {
    request.error = {
      message: 'Token expired or incorrect',
      status: HttpStatus.UNAUTHORIZED,
    };
    throw new HttpException(
      "Oops! It seems like there's an issue with your access token. It may be invalid, missing, or expired. Please try again.",
      HttpStatus.FORBIDDEN,
    );
  }
}
