import { IsEmail, IsNotEmpty } from "class-validator";


export class sendOTPDto {
    @IsEmail()
  @IsNotEmpty()
  email: string;
}