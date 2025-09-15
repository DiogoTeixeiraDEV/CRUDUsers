import { Body, Controller, Get, ParseIntPipe, Post, Param, Delete } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { createUserDto } from 'src/dto/create-users.dto';
import { Roles } from 'src/roles.decorator';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @Roles('USER', 'ADMIN')
  listAll() {
    return this.usersService.listAll();
  }

  @Post()
  @Roles('ADMIN')
  create (@Body() dto: createUserDto){
    return this.usersService.create(dto, 'USER');
    
  }

  @Get(':id')
  @Roles('ADMIN')
  findOne(@Param('id', ParseIntPipe) id: number){
    return this.usersService.listOne(id);
  }

  @Delete(':id')
  @Roles('ADMIN')
  remove (@Param('id', ParseIntPipe) id: number){
    return this.usersService.remove(id);
  }

}
