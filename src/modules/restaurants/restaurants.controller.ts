import {
  Controller,
  Body,
  Post,
  Get,
  Patch,
  Delete,
  Param,
} from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private restaurants: RestaurantsService) {}

  @Post()
  create(@Body() dto: CreateRestaurantDto) {
    return this.restaurants.create(dto);
  }

  @Get(':uuid')
  findOne(@Param('uuid') uuid: string) {
    return this.restaurants.findOne(uuid);
  }

  @Get()
  findAll() {
    return this.restaurants.findAll();
  }

  @Patch(':uuid')
  update(@Param('uuid') uuid: string, @Body() dto: UpdateRestaurantDto) {
    return this.restaurants.update(uuid, dto);
  }

  @Delete(':uuid')
  remove(@Param('uuid') uuid: string) {
    return this.restaurants.remove(uuid);
  }
}
