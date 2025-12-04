import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateBrandDto {
  @IsString()
  @MinLength(2)
  @IsNotEmpty()
  name: string;
  @IsOptional()
  logo: object;
}
