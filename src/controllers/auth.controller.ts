import { Controller, Post, Body, BadRequestException} from '@nestjs/common';
import { AuthService } from 'src/services/auth.services';
import { UsersService } from 'src/services/users.service';
import { createUserDto } from 'src/dto/create-users.dto';
import { LoginDto } from 'src/dto/login.dto';


@Controller('Auth')
export class AuthController {
    constructor(private authService: AuthService, private usersService: UsersService) {}

    @Post('register')
    async register (@Body () dto: createUserDto){
        const user = await this.usersService.create(dto, 'USER');
        return user;
    }

    @Post('login')
    async login (@Body() dto: LoginDto){
        const validated = await this.authService.validateUser(dto.email, dto.password);
        if (!validated) throw new BadRequestException('Credencial inválida');
        return this.authService.login(validated);
    }



}
 