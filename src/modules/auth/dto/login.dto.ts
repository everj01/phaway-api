import { IsString, IsNotEmpty, MaxLength, IsEmail, MinLength } from "class-validator";

export class LoginDto {
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(100)
    email!: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(15)
    password!: string;
}