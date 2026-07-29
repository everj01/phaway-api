import { Controller, Body, Post, Get, Patch, Delete, Param } from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";

@Controller('categories')
export class CategoriesController {
    constructor(private categories: CategoriesService) {}

    @Post()
    create(@Body() dto: CreateCategoryDto){
        return this.categories.create(dto)
    }

    @Get(':uuid')
    findOne(@Param('uuid') uuid: string){
        return this.categories.findOne(uuid);
    }

    @Get()
    findAll(){
        return this.categories.findAll();
    }

    @Patch(':uuid')
    update(@Param('uuid') uuid: string, @Body() dto: UpdateCategoryDto){
        return this.categories.update(uuid, dto)
    }

    @Delete(':uuid')
    remove(@Param('uuid') uuid: string){
        return this.categories.remove(uuid);
    }
    
}