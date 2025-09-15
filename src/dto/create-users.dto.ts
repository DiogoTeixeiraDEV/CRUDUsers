import { IsEmail, IsString, MinLength, IsOptional } from 'class-validator';


export class createUserDto {
    @IsEmail()
    email : string;

    @IsOptional()
    @IsString()
    username?: string;

    @IsString()
    @MinLength(6)
    password: String;
    
}

