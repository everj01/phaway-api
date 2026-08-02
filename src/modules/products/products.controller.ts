import {
  Controller,
  Body,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  UseGuards,
} from '@nestjs/common';

import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from 'generated/prisma/enums';

@Controller('products')
export class ProductsController {
  constructor(private readonly products: ProductsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateProductDto) {
    return this.products.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':uuid')
  findOne(@Param('uuid') uuid: string) {
    return this.products.findOne(uuid);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.OWNER, UserRole.STAFF)
  @Get()
  findAll() {
    return this.products.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':uuid')
  update(@Param('uuid') uuid: string, @Body() dto: UpdateProductDto) {
    return this.products.update(uuid, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':uuid')
  remove(@Param('uuid') uuid: string) {
    return this.products.remove(uuid);
  }
}
