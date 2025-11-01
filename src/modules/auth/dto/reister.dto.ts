import { USER_AGENT } from "@common/enum";
import { IsDate, IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";


export class RegisterDto {
 @IsString()
 @IsNotEmpty()
 @MinLength(3)
 @MaxLength(20)

  userName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
 @IsNotEmpty()

  password: string;
@IsDate()
  @IsNotEmpty()
  dob: Date;

  @IsString()
  @IsNotEmpty()
  gender: string;

    @IsString()
  @IsOptional()
  userAgent?: string = USER_AGENT.local; 
  
}
