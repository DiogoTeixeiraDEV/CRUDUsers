import { IsString, IsInt } from "class-validator";
import { isFloat16Array } from "util/types";

export class createProductDto {
    @IsString()
    name: string;

    @IsString()
    category: string;

    Price: number;

    @IsInt()
    stock: number;
}