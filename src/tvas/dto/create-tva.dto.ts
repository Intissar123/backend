import { IsNotEmpty, IsNumber, IsString } from "class-validator";


export class CreateTvaDto {


    @IsString()
    @IsNotEmpty()
    readonly code: string;

    @IsString()
    @IsNotEmpty()
    readonly designation: string;

    @IsNumber()
    @IsNotEmpty()
    readonly vatValue: number;

    @IsNumber()
    @IsNotEmpty()
    readonly vatType: number;



}