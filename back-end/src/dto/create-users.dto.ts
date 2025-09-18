import { IsEmail, IsString, MinLength, IsOptional, IsEnum } from 'class-validator';
import { Role } from 'generated/prisma';


export class createUserDto {
    @IsEmail()
    email : string;

    @IsOptional()
    @IsString()
    username?: string;

    @IsString()
    @MinLength(6)
    password: String;

    @IsOptional()
    @IsEnum(Role)
    role?: Role;
    
}

