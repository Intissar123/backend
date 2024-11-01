import { IsNotEmpty, IsString } from "class-validator";

export class CreateSubCategoryDto {


    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    @IsNotEmpty()
    readonly description: string;

    @IsString()
    @IsNotEmpty()
    readonly categoryId: number;
   


}