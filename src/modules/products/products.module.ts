import { Module } from '@nestjs/common';

import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CategoriesModule } from '../categories/categories.module';
import { RestaurantsModule } from '../restaurants/restaurants.module';

@Module({
  imports: [PrismaModule, CategoriesModule, RestaurantsModule],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
