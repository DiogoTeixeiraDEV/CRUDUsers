import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { createUserDto } from 'src/dto/create-users.dto';   
import { PrismaService } from './prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

 constructor(private prisma: PrismaService) {}

 async create (createDto: createUserDto, role : 'USER' | 'ADMIN' = 'USER'){
 const hashed = await bcrypt.hash(createDto.password, 10);

  try {
      const user = await this.prisma.user.create({
        data : {
          email : createDto.email,
          username : createDto.username,
          password: hashed,
          role,
        },
        select: {id : true, email : true, username: true, role: true, createdAt: true},

      });
      return user;
  } catch (err: any) {
    if (err.code == 'P2002') throw new ConflictException ('Email já existente');
    throw err;
  }
}

 async listAll() {
    return this.prisma.user.findMany({
      select: { id: true, email: true, username: true, role: true, createdAt: true },
    });
  }
 
 async listOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: { id: true, email: true, username: true, role: true, createdAt: true },
    })
    if (!user ) throw new NotFoundException ('Usuário não encontrado');
    return user;
 }

 async update (id: number){
  return this.prisma.user.update({
    where : { id },
    select : { id: true, email: true, username: true, role: true, createdAt: true }
  });
 }

 async remove(id: number) {
    await this.prisma.user.delete({ where: { id } });
    return { ok : true};
  }
}
