import { IsNotEmpty, IsNumber, IsString } from "class-validator";


export class CreateCommandelineDto {

    @IsNumber()
    @IsNotEmpty()
    readonly quantite: number;

    @IsNumber()
    @IsNotEmpty()
    readonly commandeId: number;
    

    @IsNumber()
    @IsNotEmpty()
    readonly articleId: number;
    



}