import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";


export class RegisterDto {
 @IsString()
 @IsNotEmpty()
 @MinLength(3)
 @MaxLength(20)

  userName: string;

  @IsEmail()
  @IsNotEmpty()
  email: number;

  @IsString()
 @IsNotEmpty()

  password: string;

  
}
