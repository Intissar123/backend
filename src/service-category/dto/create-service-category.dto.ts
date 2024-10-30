import { IsNotEmpty, IsString } from "class-validator";

export class CreateServiceCategoryDto {


    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    @IsNotEmpty()
    readonly description: string;

}