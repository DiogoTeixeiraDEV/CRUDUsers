import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { createUserDto } from 'src/dto/create-users.dto';   
import { PrismaService } from './prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

 constructor(private prisma: PrismaService) {}

 async create (createDto: createUserDto, role : 'USER' | 'ADMIN'){
 const hashed = await bcrypt.hash(createDto.password.toString(), 10);

  try {
      const user = await this.prisma.user.create({
        data : {
          email : createDto.email,
          username : createDto.username || '',
          password: hashed,
          role: createDto.role || 'USER',
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
 
 async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

 async update(
  id: number,
  data: Partial<{ email: string; username?: string; password: string; role?: 'USER' | 'ADMIN' }>
) {
  
  if (data.password) {
    data.password = await bcrypt.hash(data.password.toString(), 10);
  }

  const updatedUser = await this.prisma.user.update({
    where: { id },
    data, 
    select: {
      id: true,
      email: true,
      username: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return updatedUser;
}

 async remove(id: number) {
    await this.prisma.user.delete({ where: { id } });
    return { ok : true};
  }
}
