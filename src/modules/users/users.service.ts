import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { RestaurantsService } from '../restaurants/restaurants.service';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import * as bcrypt from 'bcryptjs'; // Para hashear claves

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly restaurants: RestaurantsService,
  ) {}

  async create(dto: CreateUserDto) {
    const { restaurantUuid, ...rest } = dto;

    let restaurantId!: number;

    if (restaurantUuid) {
      const restaurant = await this.restaurants.findOne(restaurantUuid);
      restaurantId = restaurant.id;
    }

    rest.password = await bcrypt.hash(dto.password, 10);

    return this.prisma.user.create({
      data: { ...rest, restaurantId },
    });
  }

  async findAll() {
    const users = await this.prisma.user.findMany({
      //select: { id: false, uuid: true, email: true, role: true, restaurantId: true, createdAt: true, updatedAt: true },
      where: { deletedAt: null },
    });

    return users;
  }

  async findOne(uuid: string) {
    const user = await this.prisma.user.findUnique({
      where: { uuid },
    });

    if (!user) {
      throw new NotFoundException(`Usuario con uuid -> ${uuid} no encontrada`);
    }

    return user;
  }

  async update(uuid: string, dto: UpdateUserDto) {
    const { restaurantUuid, password, ...rest } = dto;

    await this.findOne(uuid); // reutilizamos esto

    const data: any = { ...rest };

    if (restaurantUuid) {
      const restaurant = await this.restaurants.findOne(restaurantUuid);
      data.restaurantId = restaurant.id;
    }

    if (password) {
      data.password = await bcrypt.hash(password, 10);
    }

    return this.prisma.user.update({
      where: { uuid },
      data,
    });
  }

  async remove(uuid: string) {
    await this.findOne(uuid); // reutilizamos esto

    return this.prisma.user.update({
      where: { uuid },
      data: { deletedAt: new Date() },
    });
  }

  async findOneXEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email, deletedAt: null },
    });
  }
}
