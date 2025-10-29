import { PartialType } from '@nestjs/mapped-types';
import { RegisterDto } from './reister.dto';

export class UpdateAuthDto extends PartialType(RegisterDto) {}
