import { IsString, IsEmail, IsNotEmpty, MinLength, isNotEmpty } from 'class-validator';
 
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  id: number;
 
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
 
  @IsString()
  @IsNotEmpty()
  mobile: string;
 
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @MinLength(6)
  password: string;
  @IsString()
  @IsNotEmpty()
  salary:string;
  @IsString()
  @IsNotEmpty()
  role:string;
}
 