import { IsString, IsNotEmpty, IsOptional, IsNumber, IsPositive, IsBoolean } from "class-validator";

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsNumber()
    @IsPositive()
    price!: number;

    @IsBoolean()
    @IsOptional()
    available?: boolean;

    @IsString()
    @IsNotEmpty()
    categoryUuid!: string;

    @IsString()
    @IsNotEmpty()
    restaurantUuid!: string;
}