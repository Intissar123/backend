import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { IsEnum } from 'class-validator';

export class CreateArticleDto {


    @IsString()
    @IsNotEmpty()
    readonly code: string;

    @IsString()
    @IsNotEmpty()
    readonly nomP: string;

    @IsNumber()
    @IsNotEmpty()
    readonly prix: number;

    @IsNumber()
    @IsNotEmpty()
    readonly tva: number;

   
    @IsString()
    @IsNotEmpty()
    readonly statut: string;


    @IsNumber()
    @IsNotEmpty()

    readonly qte: number;

    @IsString()
    @IsNotEmpty()
    image: string[];

    
    @IsNumber()
    @IsNotEmpty()
    readonly subcategoryId: number;

    slug?: string;

}