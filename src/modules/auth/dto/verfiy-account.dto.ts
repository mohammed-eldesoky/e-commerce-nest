import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class VerifyAccountDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  
  @IsNotEmpty()
  @IsString()
  otp: string;
}
