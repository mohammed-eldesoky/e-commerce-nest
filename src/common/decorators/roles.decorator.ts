
import { SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
export const ROLES= 'roles';
export const Roles = (value:string[]) => SetMetadata(ROLES, value)

