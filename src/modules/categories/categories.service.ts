import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { RestaurantsService } from '../restaurants/restaurants.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly restaurants: RestaurantsService,
  ) {}

  async create(dto: CreateCategoryDto) {
    const { restaurantUuid, ...rest } = dto;

    let restaurantId!: number;

    if (restaurantUuid) {
      const restaurant = await this.restaurants.findOne(restaurantUuid);
      restaurantId = restaurant.id;
    }

    return this.prisma.category.create({
      data: { ...rest, restaurantId },
    });
  }

  async findAll() {
    const categories = await this.prisma.category.findMany({
      where: { deletedAt: null },
    });

    return categories;
  }

  async findOne(uuid: string) {
    const category = await this.prisma.category.findUnique({
      where: { uuid },
    });

    if (!category) {
      throw new NotFoundException(
        `Categoria con uuid -> ${uuid} no encontrada`,
      );
    }

    return category;
  }

  async update(uuid: string, dto: UpdateCategoryDto) {
    const { restaurantUuid, ...rest } = dto;

    await this.findOne(uuid); // reutilizamos esto

    const data: any = { ...rest };

    if (restaurantUuid) {
      const restaurant = await this.restaurants.findOne(restaurantUuid);
      data.restaurantId = restaurant.id;
    }

    return this.prisma.category.update({
      where: { uuid },
      data,
    });
  }

  async remove(uuid: string) {
    await this.findOne(uuid); // reutilizamos esto

    return this.prisma.category.update({
      where: { uuid },
      data: { deletedAt: new Date() },
    });
  }
}
