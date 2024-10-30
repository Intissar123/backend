import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { IsEnum } from 'class-validator';

export class CreateUserDto {


    @IsString()
    @IsNotEmpty()
    readonly firstName: string;

    @IsString()
    @IsNotEmpty()
    readonly lastName: string;

    @IsNumber()
    @IsNotEmpty()
    readonly email: string;

    @IsNumber()
    @IsNotEmpty()
    readonly password: string;


    @IsString()
    @IsNotEmpty()
    readonly role: string;


    @IsNumber()
    @IsNotEmpty()

    readonly qte: number;

    @IsString()
    @IsNotEmpty()
    image: string[];


    @IsNumber()
    @IsNotEmpty()
    readonly subcategoryId: number;

}