import { applyDecorators, UseGuards } from '@nestjs/common';
import { Roles } from './roles.decorator';
import { RolesGuard } from '@common/guards/roles.guard';
import { AuthGuard } from '@common/guards/auth.guard';

export const Auth = (roles: string[]) => {
  return applyDecorators(Roles(roles), UseGuards(AuthGuard, RolesGuard));
};
