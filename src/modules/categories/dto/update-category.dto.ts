import { PartialType } from "@nestjs/mapped-types"; 
// Esto toma los campos de CreatedProductDto por ejemplo, pero los convierte en OPCIONES, utilk para el UPDATE

import { CreateCategoryDto } from "./create-category.dto";

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {

}