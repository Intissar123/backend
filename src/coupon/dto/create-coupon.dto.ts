import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { IsEnum } from 'class-validator';

export class CreateCouponDto {


    @IsString()
    @IsNotEmpty()
    readonly code: string;

    @IsNumber()
    @IsNotEmpty()
    readonly discount: number;

   
    @IsNotEmpty()
    readonly isActive: boolean;

    @IsNumber()
    @IsNotEmpty()
    readonly usageLimit: number;

    @IsNumber()
    @IsNotEmpty()

    readonly usedCount: number;

}