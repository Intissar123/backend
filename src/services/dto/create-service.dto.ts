import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateServiceDto{
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    @IsNotEmpty()
    readonly description: string;

    @IsNumber()
    @IsNotEmpty()
    readonly cost: number;

    @IsNumber()
    @IsNotEmpty()
    readonly serviceCategoryId: number;

   

    
}