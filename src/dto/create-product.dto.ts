import { IsString, IsInt } from "class-validator";

export class createProductDto {
    @IsString()
    name: string;

    @IsString()
    category: string;

    @IsInt()
    stock: number;
}