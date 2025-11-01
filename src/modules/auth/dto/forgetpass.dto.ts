import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ForgetPassDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  otp: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  newPassword: string;
}
