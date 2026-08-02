import { Controller, Body, Post, Get, Patch, Delete, Param } from "@nestjs/common";

import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserDefaultEntity } from "./entities/user-default.entity";

@Controller('users')
export class UsersController {
    constructor(private users: UsersService) {}

    @Post()
    create(@Body() dto: CreateUserDto){
        return this.users.create(dto)
    }

    @Get(':uuid')
    async findOne(@Param('uuid') uuid: string){
        const user = await this.users.findOne(uuid);
        return new UserDefaultEntity(user);
    }

    @Get()
    async findAll(){
        const users = await this.users.findAll();
        return users.map(user => new UserDefaultEntity(user));
    }

    @Patch(':uuid')
    update(@Param('uuid') uuid: string, @Body() dto: UpdateUserDto){
        return this.users.update(uuid, dto)
    }

    @Delete(':uuid')
    remove(@Param('uuid') uuid: string){
        return this.users.remove(uuid);
    }
  
}