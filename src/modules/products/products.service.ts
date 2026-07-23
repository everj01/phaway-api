import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";

@Injectable()
export class ProductsService {
    constructor(private prisma: PrismaService) {}

    create(dto: CreateProductDto){
        return this.prisma.product.create({
            data: dto
        })
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
        
        if(!product){
            throw new NotFoundException(`Producto con uuid -> ${uuid} no encontrado`);
        }

        return product;
    }

    async update(uuid: string, dto: UpdateProductDto) {
        await this.findOne(uuid); // reutilizamos esto

        return this.prisma.product.update({
            where: { uuid },
            data: dto
        });
    }

    async remove(uuid: string) {
        await this.findOne(uuid); // reutilizamos esto

        return this.prisma.product.update({
            where: { uuid },
            data: { deletedAt: new Date() }
        });
    }
}