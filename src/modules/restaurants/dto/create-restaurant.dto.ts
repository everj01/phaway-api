import { IsString, IsNotEmpty, IsOptional } from "class-validator";

export class CreateRestaurantDto {
    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsString()
    @IsNotEmpty()
    legalName!: string;

    @IsString()
    @IsNotEmpty()
    taxId!: string;

    @IsString()
    @IsOptional()
    phone?: string;

    @IsString()
    @IsOptional()
    email?: string;

    @IsString()
    @IsOptional()
    address?: string;

    @IsString()
    @IsOptional()
    postalCode?: string;
}