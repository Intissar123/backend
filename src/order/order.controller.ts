import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Patch,
    Post,
    Put,
    Req,
    Res,
    UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { Request } from 'express';
import { CreateOrderDto } from './dto/create-order.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { UpdateOrderDto } from './dto/update-order.dto';
@Controller('/api/orders')
export class OrderController {
    constructor(private readonly orderService: OrderService) { }

    @Post()
   // @UseGuards(AuthGuard)
    async create(
        @Res() response,
        @Body() createOrderDto: CreateOrderDto,
        @Req() request: Request,
    ) {
        try {
            // const userId = request['user'].sub;
            // createOrderDto.userId = userId;
            const newOrder = await this.orderService.createOrder({
                userId: createOrderDto.userId,
                totalAmount: createOrderDto.totalAmount,
                delivery: createOrderDto.delivery,
                location: createOrderDto.location,
                city: createOrderDto.city,
                address: createOrderDto.address,
                phoneNumber: createOrderDto.phoneNumber,
                cartItems: createOrderDto.cartItems,
            });

            return newOrder;
        } catch (error) {
            console.log(error)
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @Get()
    async getOrders(@Res() response) {
        try {
            const OrderData = await this.orderService.getAllOrder();
            return response.status(HttpStatus.OK).json({
                message: ' All Order  data found  successfully ',
                status: HttpStatus.OK,
                data: OrderData,
            });
        } catch (err) {
            console.log(err)
            return response.status(err.status).json({
                status: HttpStatus.BAD_REQUEST,
                message: err.response,
                data: null,
            });
        }
    }
    @Get('/:id')
    async getOrder(@Res() response, @Param('id') id: number) {
        try {
            const existingOrder = await this.orderService.getOrderById(id);
            return response.status(HttpStatus.OK).json({
                message: 'Order found successfully',
                data: existingOrder,
                status: HttpStatus.OK,
            });
        } catch (err) {
            console.log(err);
            const status = err.status || HttpStatus.BAD_REQUEST;
            return response.status(status).json({
                status,
                message: err.response || 'An error occurred',
                data: null,
            });
        }
    }

    

    @Put('/:id')
    @UseGuards(AuthGuard)
    async update(
        @Param('id') id: number,
        @Body() updateOrderDto: UpdateOrderDto,
    ) {
        try {
            const updatedCategory = await this.orderService.update(
                updateOrderDto,
                id,
            );
            return { updatedCategory };
        } catch (error) {
            throw new HttpException(`${error.message}`, HttpStatus.NOT_FOUND);
        }
    }

    // @Put(':id')
    // @UsePipes(new ValidationPipeWithErrors())
    // async update(
    //   @Res() response,
    //   @Param('id') id: number,
    //   @Body() updateOrderDto: Partial<Order>,
    // ) {
    //   try {
    //     const deletedOrder = await this.OrderService.updateOrderById(
    //       id,
    //       updateOrderDto,
    //     );
    //     return response.status(HttpStatus.OK).json({
    //       message: 'Order deleted  successfully',

    //       data: deletedOrder,
    //       status: HttpStatus.OK,
    //     });
    //   } catch (err) {
    //     return response.status(HttpStatus.BAD_REQUEST).json({
    //       message: err.response,
    //       status: HttpStatus.BAD_REQUEST,
    //       data: null,
    //     });
    //   }
    // }

    @Delete(':id')
    async deleteOrder(@Res() response, @Param('id') id: number) {
        try {
            const deletedOrder = await this.orderService.deleteOrderById(id);
            return response.status(HttpStatus.OK).json({
                message: 'Order deleted  successfully',

                data: deletedOrder,
                status: HttpStatus.OK,
            });
        } catch (err) {
            console.log(err)
            return response.status(HttpStatus.BAD_REQUEST).json({
                message: err.response,
                status: HttpStatus.BAD_REQUEST,
                data: null,
            });
        }
    }
}
