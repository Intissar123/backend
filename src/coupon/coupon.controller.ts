import { BadRequestException, Body, Controller, Delete, Get, HttpException, HttpStatus, NotFoundException, Param, Post, Put, Query, Res } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import express, { Request, Response } from 'express';
import { error } from 'console';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { coupon } from '../../models/coupon.js'
import { get } from 'http';
import { Coupon } from './coupon.interface';

@Controller('coupon')
export class CouponController {
    constructor(private readonly couponService: CouponService) { }
    @Post()
    async create(@Res() response, @Body() createCouponDto: CreateCouponDto) {
        try {
            const newCategory = await this.couponService.createCoupon(createCouponDto);
            response.status(HttpStatus.CREATED).json({
                message: 'coupon has been created successfully',
                status: HttpStatus.CREATED,
                data: newCategory
            });
        }
        catch (error) {
            throw new HttpException(`${error.message}`, HttpStatus.CONFLICT);
        }
    }
    // @Get()
    // async findAll(@Res() response) {
    //     try {
    //         const coupons = await this.couponService.getAllCoupons();
    //         response.status(HttpStatus.OK).json({
    //             message: 'all coupon data successfully',
    //             status: HttpStatus.OK,
    //             data: coupons
    //         });

    //     } catch (error) {
    //         response.status(HttpStatus.BAD_REQUEST).send("saving " + JSON.stringify(error));
    //     }

    // }
    // @Get('/:code')
    // async getCoupon(@Res() response, @Param('code') code: string) {
    //     try {
    //         console.log(code);

    //         const existing = await this.couponService.getCouponByCode(code);
    //         console.log(existing);

    //         return response.status(HttpStatus.OK).json({
    //             message: 'coupon found  successfully',

    //             data: existing,
    //             status: HttpStatus.OK,
    //         });
    //     } catch (err) {
    //        console.log(err)
    //         response.status(HttpStatus.BAD_REQUEST).send("saving " + JSON.stringify(err));


    //     }
    // }

    @Get('/:code')
    async findOneByCode(@Param('code') code: string) {
        try {
            return await this.couponService.getCouponByCode(code);
        } catch (error) {
            console.log(error);
            throw new HttpException(`${error.message}`, HttpStatus.NOT_FOUND);
        }
    }

    @Get('/:id')
    async getCoupon(@Res() response, @Param('id') id: number) {
        try {
            console.log(id);

            const existing = await this.couponService.getCouponById(id);
            console.log(existing);

            return response.status(HttpStatus.OK).json({
                message: 'coupon found  successfully',

                data: existing,
                status: HttpStatus.OK,
            });
        } catch (err) {
            response.status(HttpStatus.BAD_REQUEST).send("saving " + JSON.stringify(err));


        }
    }
    @Put(':id')
    async updateCoupon(
        @Param('id') id: number,
        @Body() updateCouponDto: UpdateCouponDto,
    ) {
        const updatedCoupon = await this.couponService.updatecoupon(id, updateCouponDto);
        return {
            success: true,
            data: updatedCoupon,
        };
    }
    @Delete('/:id')
    async remove(@Res() response, @Param('id') id: number): coupon {
        try {
            console.log(id);

            const existing = await this.couponService.deleteCouponById(id);
            console.log(existing);

            response.status(HttpStatus.OK).json({
                message: 'delete successfully',

                data: existing,
                status: HttpStatus.OK,
            });
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.NOT_FOUND);


        }
    }
}
