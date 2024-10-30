import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { Service } from '../../models/service.js'
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ServicesService } from './services.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path from 'path';

@Controller('services')
export class ServicesController {
    constructor(private readonly serviceService: ServicesService) { }

    @Post()
   
   
    async create(@Res() response, @Body() createServiceDto: CreateServiceDto, @UploadedFile() file) {
        try {
           
            const newService = await this.serviceService.createService(createServiceDto);
            response.status(HttpStatus.CREATED).json({
                message: 'service has been created successfully',
                status: HttpStatus.CREATED,
                data: newService
            });
        }
        catch (error) {
            response.status(HttpStatus.BAD_REQUEST).send("saving " + JSON.stringify(error));
        }
    }
    @Get()
    async findAll(@Res() response) {
        try {
            const services = await this.serviceService.getAllServices();
            response.status(HttpStatus.OK).json({
                message: 'all service data successfully',
                status: HttpStatus.OK,
                data: services
            });

        } catch (error) {
            response.status(HttpStatus.BAD_REQUEST).send("saving " + JSON.stringify(error));
        }

    }
    @Get('/:id')
    async getService(@Res() response, @Param('id') id: number) {
        try {
            console.log(id);

            const existing = await this.serviceService.getServiceById(id);
            console.log(existing);

            return response.status(HttpStatus.OK).json({
                message: 'Service found  successfully',

                data: existing,
                status: HttpStatus.OK,
            });
        } catch (err) {
            response.status(HttpStatus.BAD_REQUEST).send("saving " + JSON.stringify(err));


        }
    }
    @Put('/:id')
    async updateService(@Res() response, @Param('id') ServiceId: number, @Body() updateServiceDto: UpdateServiceDto) {
        try {
            console.log(ServiceId);

            const existing = await this.serviceService.updateservice(ServiceId, updateServiceDto);
            console.log(existing);
            return response.status(HttpStatus.OK).json({
                message: 'service has been  successfully update',
                data: existing,
                status: HttpStatus.OK

            });
        } catch (err) {
            console.log(err);
            response.status(HttpStatus.BAD_REQUEST).send("saving " + JSON.stringify(err));


        }
    }
    // @Delete('/:id')
    // async deleteArticle(@Res() response, @Param('id') ArticleId: number) {
    //     try {
    //         console.log(ArticleId);
    //         const deletedProduct = await this.articleService.deleteArticle(ArticleId);
    //         return response.status(HttpStatus.OK).json({
    //             message: 'Article deleted  successfully',
    //             data: deletedProduct,
    //             status: HttpStatus.OK

    //         });
    //     } catch (err) {
    //         response.status(HttpStatus.BAD_REQUEST).send("saving " + JSON.stringify(err));


    //     }
    // }

    @Delete('/:id')
    async remove(@Res() response, @Param('id') id: number): Service {
        try {
            console.log(id);

            const existing = await this.serviceService.deleteServiceById(id);
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