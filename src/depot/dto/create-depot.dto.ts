import { IsNotEmpty, IsNumber, IsString } from "class-validator";


export class CreateDepotDto {


    @IsNumber()
    @IsNotEmpty()
    readonly QuantiteStock: number;

    @IsNumber()
    @IsNotEmpty()
    readonly articleId: number;
    



}