import { IsDate, IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";


export class CreateDevisDto {


    @IsString({ message: 'message must be a string.' })
    @IsNotEmpty({ message: 'message cannot be empty.' })
    readonly message: string;

    @IsNumber()
    @IsNotEmpty()
    readonly serviceId: number
    @IsEmail()
    @IsNotEmpty()
    email: string;

 

   




}