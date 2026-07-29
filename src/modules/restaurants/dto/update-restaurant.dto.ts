import { PartialType } from "@nestjs/mapped-types"; 
// Esto toma los campos de UpdateRestaurantDto por ejemplo, pero los convierte en OPCIONES, utilk para el UPDATE

import { CreateRestaurantDto } from "./create-restaurant.dto";

export class UpdateRestaurantDto extends PartialType(CreateRestaurantDto) {

}