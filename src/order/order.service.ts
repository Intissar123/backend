import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
const db = require('../../models');
import { Order } from './Order.interface';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
const { order, user } = require('../../models');

@Injectable()
export class OrderService {
    findCartItemsByOrderId(id: number) {
        throw new Error('Method not implemented.');
    }
    async createOrder(createOrderDto) {
        try {
            const orderData = {
                userId: createOrderDto.userId,
                totalAmount: createOrderDto.totalAmount,
                delivery: createOrderDto.delivery,
                location: createOrderDto.location,
                city: createOrderDto.city,
                address: createOrderDto.address,
                phoneNumber: createOrderDto.phoneNumber,
            };

            const transaction = await db.sequelize.transaction();

            try {
                const order = await db.order.create(orderData, { transaction });

                const cartItems = await Promise.all(
                    createOrderDto.cartItems.map((item) => {
                        console.log(item)
                        return db.cartItem.create(
                            {
                                orderId: order.id,
                                prix: item.prix,
                                nomP: item.nomP,
                                image: item.image,
                                qte: item.qte,
                            },
                            { transaction },
                        );
                    }),
                );

                await transaction.commit();

                return { order, cartItems };
            } catch (error) {
                await transaction.rollback();
                throw error;
            }
        } catch (error) {
            console.log(error)
            throw new HttpException(error.message, 400);
        }
    }

    async getAllOrder(): Promise<Order[]> {
        const Order = await db.order.findAll({
            include: [{ model: user }],
        });
        if (!Order || Order.length == 0) {
            throw new NotFoundException('Order data not found!');
        }
        return Order;
    }
    // async getOrderById(id: number): Promise<Order> {
    //     const order = await db.order.findByPk(id, {
    //         include: [{ model: db.user }, { model: db.cartItem, as: 'cartItems' }]
    //     });

    //     // const cartItems = await db.cartItem.findAll({
    //     //     where: { OrderId: id }
    //     // });
    //     // order.cartItems = cartItems;
    //     if (!order) {
    //         throw new NotFoundException(`Order#${id} not found`);
    //     }
    //     return order;
    // }
    async getOrderById(id: number): Promise<Order> {
        const order = await db.order.findByPk(id, {
            include: [
                { model: db.user },
                { model: db.cartItem, as: 'cartItems' }
            ]
        });

        if (!order) {
            throw new NotFoundException(`Order#${id} not found`);
        }

        const cartItems = await db.cartItem.findAll({
            where: { orderId: id }  // Changed OrderId to orderId
        });
        order.cartItems = cartItems;

        return order;
    }





    async update(data: UpdateOrderDto, id: number,) {
        try {

            const order = await this.getOrderById(id);
            console.log("orderData", order)
            if (!order) {
                throw new NotFoundException(`Order with ID ${id} not found`);
            }


            const res = await db.Order.update({ status: data.status }, { where: { id: id } });

            for (const cartItem of order.cartItems) {
                await this.updateProductQuantity(cartItem.id, cartItem.quantity);
            }
            const dataOrder = await this.getOrderById(id);
            return { dataOrder };

        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    async updateProductQuantity(cartItemId: number, quantity: number) {
        try {
            const cartItem = await db.CartItem.findByPk(cartItemId);
            if (!cartItem) {
                throw new NotFoundException(`Cart item with ID ${cartItemId} not found`);
            }

            console.log(cartItem)
            const product = await db.Product.findByPk(cartItem.id);
            if (!product) {
                throw new NotFoundException(`Product associated with cart item ${cartItemId} not found`);
            }
            product.quantity -= quantity;
            await product.save();

            return true;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    async deleteOrderById(id: number): Promise<string> {
        const Order = await this.getOrderById(id);
        if (!Order) {
            throw new NotFoundException(`Order#${id} not found`);
        } else {
            await db.order.destroy({ where: { id: id } });
            return `Order with ID ${id} deleted successfully.`;
        }
    }
}