import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Coupon } from './coupon.interface';
import { UpdateCouponDto } from './dto/update-coupon.dto';
const db = require('../../models');
const ERRORS = require('../../config/errors-msgs.js');
@Injectable()
export class CouponService {
    async createCoupon(data: any): Promise<Coupon> {
        try {
            const c = await db.coupon.create(data)
            //console.log(db);
            //console.log(db.Articles);
            return c;
        } catch (error) {
            throw new HttpException(`${error.message}`, HttpStatus.CONFLICT);
        }
    }
    // async getAllCoupons(): Promise<Coupon[]> {
    //     try {
    //         const coupon = await db.coupon.findAll({

    //         });

    //         return coupon;
    //     } catch (error) {
    //         throw new HttpException(
    //             `${error.message}`,
    //             HttpStatus.INTERNAL_SERVER_ERROR,
    //         );
    //     }
    // }
    // async getCouponByCode(code: string): Promise<Coupon> {
    //     const coupon = await db.coupon.findByPk(code);
    //     if (!coupon) {
    //         throw new HttpException(
    //             `${ERRORS.RESOURCE_NOT_FOUND}`,
    //             HttpStatus.NOT_FOUND,
    //         );
    //     }
    //     return coupon;
    // } catch(error) {
    //     console.log(error)
    //     throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    // }
    // src/coupon/coupon.service.ts

    async getCouponByCode(code: string) {
        try {
            console.log(code);

            // Validate that the code is a valid string, not a number or another type
            if (!code || typeof code !== 'string') {
                throw new HttpException(
                    'Coupon code must be a valid string',
                    HttpStatus.BAD_REQUEST,
                );
            }

            const coupon = await db.coupon.findByPk(code);

            if (!coupon) {
                throw new HttpException(
                    `Coupon with code ${code} not found`,
                    HttpStatus.NOT_FOUND,
                );
            }
            return coupon;
        } catch (error) {
            console.log(error);
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }
    async getCouponById(id: number): Promise<Coupon> {
        const coupon = await db.coupon.findByPk(id);
        if (!coupon) {
            throw new HttpException(
                `${ERRORS.RESOURCE_NOT_FOUND}`,
                HttpStatus.NOT_FOUND,
            );
        }
        return coupon;
    } catch(error) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
    async updatecoupon(id: number, data: UpdateCouponDto,): Promise<UpdateCouponDto | string> {
        try {
            const existing = await db.coupon.findByPk(id);
            if (!existing) {
                return `coupon not found!`
            } else if (existing != null) {
                await db.coupon.update(data, { where: { id: id } })
                return existing;
            } else throw new NotFoundException(`coupon #${id} not found`);
        } catch (error) { throw new HttpException(error.message, HttpStatus.NOT_FOUND); }
    }
    async deleteCouponById(id: number): Promise<string> {
        const coupon = await this.getCouponById(id);
        if (!coupon) {
            throw new NotFoundException(`coupon #${id} not found`);
        } else {
            await db.coupon.destroy({ where: { id: id } });
            return `coupon with ID ${id} deleted successfully.`;
        }
    }
}



