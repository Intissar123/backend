import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateServiceSubCategoryDto {


    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    @IsNotEmpty()
    readonly description: string;

    @IsNumber()
    @IsNotEmpty()
    readonly ServicecategoryId: number;
    


}