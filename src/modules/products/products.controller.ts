import { Controller, Body, Post, Get, Patch, Delete, Param } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";

@Controller('products')
export class ProductsController {
    constructor(private products: ProductsService) {}

    @Post()
    create(@Body() dto: CreateProductDto){
        return this.products.create(dto)
    }

    @Get(':uuid')
    findOne(@Param('uuid') uuid: string){
        return this.products.findOne(uuid);
    }

    @Get()
    findAll(){
        return this.products.findAll();
    }

    @Patch(':uuid')
    update(@Param('uuid') uuid: string, @Body() dto: UpdateProductDto){
        return this.products.update(uuid, dto)
    }

    @Delete(':uuid')
    remove(@Param('uuid') uuid: string){
        return this.products.remove(uuid);
    }
    
}