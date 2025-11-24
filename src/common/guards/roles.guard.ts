import { ROLES, Roles } from '@common/decorators/roles.decorator';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const allowedRoles = this.reflector.getAllAndOverride<string[]>(ROLES, [context.getHandler(), context.getClass()]);
    const publicRole= this.reflector.get('PUBLIC', context.getHandler());
// if  public role do not check role pass 
    if (publicRole) {
      return true;
    }
    if (!allowedRoles.includes(request.user.role)) {
      throw new UnauthorizedException('not allowed');
    }

    return true;
  }
}
