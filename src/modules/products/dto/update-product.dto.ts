import { PartialType } from "@nestjs/mapped-types"; 
// Esto toma los campos de CreatedProductDto por ejemplo, pero los convierte en OPCIONES, utilk para el UPDATE

import { CreateProductDto } from "./create-product.dto";

export class UpdateProductDto extends PartialType(CreateProductDto) {

}