import { Body, Controller, Get, ParseIntPipe, Post, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { createUserDto } from 'src/dto/create-users.dto';
import { Roles } from 'src/middlewares/roles.decorator';
import { JwtGuard } from 'src/middlewares/jwt.guard';
import { RolesGuard } from 'src/middlewares/roles.guard';


@UseGuards(JwtGuard, RolesGuard)
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

  @Post()
  @Roles('ADMIN')
  update(
    @Body('id', ParseIntPipe) id: number,
    @Body() data: Partial<{ email: string; username?: string; password: string; role?: 'USER' | 'ADMIN' }>
  ) {
    return this.usersService.update(id, data);
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
