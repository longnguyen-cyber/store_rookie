import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Role } from '../enums';
import { ROLES_KEY } from '../decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
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

    // Check if user is admin
    if (user.isAdmin) {
      return true;
    }

    return requiredRoles.some((role) => user.roles?.includes(role));
  }
}
