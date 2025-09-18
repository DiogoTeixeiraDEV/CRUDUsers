import { Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async validateUser (email : string, password: string) {
        const user = await this.usersService.findByEmail(email);
        if (!user) return null;
        const match = await bcrypt.compare(password, user.password);
        if (!match) return null;
        return { id: user.id, email: user.email, username: user.username, role: user.role};
    }

    async login (user:{ id: number; email: string; username?: string; role: string }){
        const payload = { sub: user.id, email: user.email, username: user.username, role: user.role };
        return { access_token: this.jwtService.sign(payload)};
    }
}