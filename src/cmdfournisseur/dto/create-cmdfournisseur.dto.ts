import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";


export class CreateCmdfournisseurDto {


    @IsNumber()
    @IsNotEmpty()
    readonly quantity: number;

    

    @IsNumber()
    @IsNotEmpty()
    readonly articleId: number;


    @IsNumber()
    @IsNotEmpty()
    readonly fournisseurId: number;


}