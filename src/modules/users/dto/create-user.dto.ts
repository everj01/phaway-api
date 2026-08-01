import { IsString, IsNotEmpty, MaxLength, IsPositive, IsBoolean, IsEnum, IsEmail, MinLength } from "class-validator";
import { UserRole } from "generated/prisma/enums";

export class CreateUserDto {
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

    @IsEnum(UserRole)
    role!:  UserRole;

    @IsString()
    @IsNotEmpty()
    restaurantUuid!: string;
}