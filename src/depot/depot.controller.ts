import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { DepotsService } from './depot.service';
import { CreateDepotDto } from './dto/create-depot.dto';
import { Depot } from '../../models/depot.js'
import { UpdateDepotDto } from './dto/update-depot.dto';

@Controller('Depots')
export class DepotController {
    constructor(private readonly depotService: DepotsService) { }

    @Post()
    async create(@Res() response, @Body() createDepotDto: CreateDepotDto) {
        try {
            const newDepot = await this.depotService.createDepot(createDepotDto);
            response.status(HttpStatus.CREATED).json({
                message: 'Depot has been created successfully',
                status: HttpStatus.CREATED,
                data: newDepot
            });
        }
        catch (error) {
            console.log(error);
            response.status(HttpStatus.BAD_REQUEST).send("saving " + JSON.stringify(error));
        }
    }
    @Get()
    async findAll(@Res() response) {
        try {
            const Depots = await this.depotService.getAllDepots();
            response.status(HttpStatus.OK).json({
                message: 'all Depot data successfully',
                status: HttpStatus.OK,
                data: Depots
            });

        } catch (error) {
            response.status(HttpStatus.BAD_REQUEST).send("saving " + JSON.stringify(error));
        }

    }
    @Get('/:id')
    async getDepot(@Res() response, @Param('id') id: number) {
        try {
            console.log(id);

            const existing = await this.depotService.getDepotById(id);
            console.log(existing);

            return response.status(HttpStatus.OK).json({
                message: 'Depot found  successfully',

                data: existing,
                status: HttpStatus.OK,
            });
        } catch (err) {
            response.status(HttpStatus.BAD_REQUEST).send("saving " + JSON.stringify(err));


        }
    }
    @Put('/:id')
    async update(
        @Res() response,
        @Param('id') id: number,
        @Body() updateDepotDto: Partial<Depot>,
    ) {
        try {
            const updatedepot = await this.depotService.updatedepot(
                id,
                updateDepotDto,
            );
            return response.status(HttpStatus.OK).json({
                message: 'depot updated  successfully',

                data: updatedepot,
                status: HttpStatus.OK,
            });
        } catch (err) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                message: err.response,
                status: HttpStatus.BAD_REQUEST,
                data: null,
            });
        }
    }
    // @Delete('/:id')
    // async deleteDepot(@Res() response, @Param('id') DepotId: number) {
    //     try {
    //         console.log(DepotId);
    //         const deletedProduct = await this.DepotService.deleteDepot(DepotId);
    //         return response.status(HttpStatus.OK).json({
    //             message: 'Depot deleted  successfully',
    //             data: deletedProduct,
    //             status: HttpStatus.OK

    //         });
    //     } catch (err) {
    //         response.status(HttpStatus.BAD_REQUEST).send("saving " + JSON.stringify(err));


    //     }
    // }

    @Delete('/:id')
    async remove(@Res() response, @Param('id') id: number): Depot {
        try {
            console.log(id);

            const existing = await this.depotService.deleteDepotById(id);
            console.log(existing);

            response.status(HttpStatus.OK).json({
                message: 'delete successfully',

                data: existing,
                status: HttpStatus.OK,
            });
        } catch (err) {
            response.status(HttpStatus.BAD_REQUEST).send("saving " + JSON.stringify(err));


        }
    }

}

