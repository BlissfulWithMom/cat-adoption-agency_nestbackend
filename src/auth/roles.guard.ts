import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!requiredRoles) {
      return true; // No specific role required, so access is allowed
    }
    const { user } = context.switchToHttp().getRequest();
    // Check if the user has the required role
    return requiredRoles.some((role) => user.roles.includes(role));
  }
}
