import { IsNotEmpty, IsNumber, IsString } from "class-validator";


export class CreateFournisseurDto {



    @IsString()
    @IsNotEmpty()
    readonly NomF: string;

    @IsNumber()
    @IsNotEmpty()
    readonly numTlp: number;

 


    @IsString()
    @IsNotEmpty()
    readonly adresse: string;

}