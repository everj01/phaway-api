import { Module } from "@nestjs/common";

import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { PrismaModule } from "src/prisma/prisma.module";

import { RestaurantsModule } from "../restaurants/restaurants.module";

@Module({
    imports: [PrismaModule, RestaurantsModule],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService]
})
export class UsersModule {

}
