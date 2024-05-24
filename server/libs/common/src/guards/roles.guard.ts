import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Role } from '../enums';
import { ROLES_KEY } from '../decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }

    const gqlContext = GqlExecutionContext.create(context);
    const isGraphql = gqlContext.getType() === 'graphql';
    const request = isGraphql
      ? gqlContext.getContext().req
      : context.switchToHttp().getRequest();
    const { user } = request;

    if (!user) {
      const response = context.switchToHttp().getResponse();
      response.redirect('/login');
      return false;
    }
    if (user.isAdmin) {
      return true;
    }
    if (requiredRoles.includes(Role.User) && !user.isAdmin) {
      return true;
    }

    return false;
  }
}
