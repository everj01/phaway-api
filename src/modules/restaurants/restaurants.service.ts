import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateRestaurantDto } from "./dto/create-restaurant.dto";
import { UpdateRestaurantDto } from "./dto/update-restaurant.dto";

@Injectable()
export class RestaurantsService {
    constructor(private prisma: PrismaService) {}

    create(dto: CreateRestaurantDto){
        return this.prisma.restaurant.create({
            data: dto
        })
    }

    async findAll() {
        const restaurants = await this.prisma.restaurant.findMany({
            where: { deletedAt: null },
        });

        return restaurants;
    }

    async findOne(uuid: string) {
        const restaurant = await this.prisma.restaurant.findUnique({
            where: { uuid },
        });
        
        if(!restaurant){
            throw new NotFoundException(`Restaurante con uuid -> ${uuid} no encontrada`);
        }

        return restaurant;
    }

    async update(uuid: string, dto: UpdateRestaurantDto) {
        await this.findOne(uuid); // reutilizamos esto

        return this.prisma.restaurant.update({
            where: { uuid },
            data: dto
        });
    }

    async remove(uuid: string) {
        await this.findOne(uuid); // reutilizamos esto

        return this.prisma.restaurant.update({
            where: { uuid },
            data: { deletedAt: new Date() }
        });
    }
}