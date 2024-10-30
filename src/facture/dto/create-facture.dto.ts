import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";


export class CreateFactureDto {


    @IsString()
    @IsNotEmpty()
    readonly numFacture: string;

    @IsDate()
    @IsNotEmpty()
    readonly date: Date;

    @IsNumber()
    @IsNotEmpty()
    readonly totalHT: number;

    @IsNumber()
    @IsNotEmpty()
    readonly totalTVA: number;

    @IsNumber()
    @IsNotEmpty()
    readonly totalTTC: number;


    @IsString()
    @IsNotEmpty()
    readonly statut: string;

    @IsNumber()
    @IsNotEmpty()
    readonly commandeId: number;

}