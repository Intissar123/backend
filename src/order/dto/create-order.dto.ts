import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';

export class CreateOrderDto {
    @IsNotEmpty()
    totalAmount: number;

    @IsNotEmpty()
    delivery: string;

    @IsString()
    @IsNotEmpty()
    location: string;

    @IsString()
    @IsNotEmpty()
    city: string;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsNotEmpty()
    phoneNumber: string;

    status: string;

    userId: [];

    
   
    cartItems: [];
}
