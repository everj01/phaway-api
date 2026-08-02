import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { RestaurantsService } from '../restaurants/restaurants.service'; // tenant
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CategoriesService } from '../categories/categories.service';

@Injectable()
export class ProductsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly categories: CategoriesService,
    private readonly restaurants: RestaurantsService,
  ) {}

  async create(dto: CreateProductDto) {
    const { categoryUuid, restaurantUuid, ...rest } = dto;

    const restaurant = await this.restaurants.findOne(restaurantUuid);
    const category = await this.categories.findOne(categoryUuid);

    if (category.restaurantId !== restaurant.id) {
      throw new NotFoundException(
        `Categoria con uuid -> ${categoryUuid} no encontrada`,
      );
    }

    return this.prisma.product.create({
      data: { ...rest, categoryId: category.id, restaurantId: restaurant.id },
    });
  }

  async findAll() {
    const products = await this.prisma.product.findMany({
      where: { deletedAt: null },
    });

    return products;
  }

  async findOne(uuid: string) {
    const product = await this.prisma.product.findUnique({
      where: { uuid },
    });

    if (!product) {
      throw new NotFoundException(`Producto con uuid -> ${uuid} no encontrado`);
    }

    return product;
  }

  async update(uuid: string, dto: UpdateProductDto) {
    const { categoryUuid, restaurantUuid, ...rest } = dto;

    const product = await this.findOne(uuid); // ahora sí lo guardamos, lo necesitamos como fallback

    const data: any = { ...rest };

    if (restaurantUuid) {
      const restaurant = await this.restaurants.findOne(restaurantUuid);
      data.restaurantId = restaurant.id;
    }

    if (categoryUuid) {
      const category = await this.categories.findOne(categoryUuid);
      data.categoryId = category.id;
    }

    if (restaurantUuid || categoryUuid) {
      const effectiveRestaurantId = data.restaurantId ?? product.restaurantId;
      const effectiveCategoryId = data.categoryId ?? product.categoryId;

      const category = await this.prisma.category.findUnique({
        where: { id: effectiveCategoryId },
      });

      if (category?.restaurantId !== effectiveRestaurantId) {
        throw new NotFoundException(
          `Categoria no encontrada para este restaurante`,
        );
      }
    }

    return this.prisma.product.update({
      where: { uuid },
      data,
    });
  }

  async remove(uuid: string) {
    await this.findOne(uuid); // reutilizamos esto

    return this.prisma.product.update({
      where: { uuid },
      data: { deletedAt: new Date() },
    });
  }
}
