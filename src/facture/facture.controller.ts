import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { FactureService } from './facture.service';
import { CreateFactureDto } from './dto/create-facture.dto';
import { UpdateFactureDto } from './dto/update-facture.dto.js';
import { Facture } from '../../models/facture.js';

@Controller('factures')
export class FactureController {
    constructor(private readonly factureService: FactureService) { }

    @Post()
    async create(@Res() response, @Body() createFactureDto: CreateFactureDto) {
        try {
            const newFacture = await this.factureService.createFacture(createFactureDto);
            response.status(HttpStatus.CREATED).json({
                message: 'facture has been created successfully',
                status: HttpStatus.CREATED,
                data: newFacture
            });
        }
        catch (error) {
            response.status(HttpStatus.BAD_REQUEST).send("saving " + JSON.stringify(error));
        }
    }
    @Get()
    async findAll(@Res() response) {
        try {
            const factures = await this.factureService.getAllFactures();
            response.status(HttpStatus.OK).json({
                message: 'all article data successfully',
                status: HttpStatus.OK,
                data: factures
            });

        } catch (error) {
            response.status(HttpStatus.BAD_REQUEST).send("saving " + JSON.stringify(error));
        }

    }
    @Get('/:id')
    async getFacture(@Res() response, @Param('id') id: number) {
        try {
            console.log(id);

            const existing = await this.factureService.getFactureById(id);
            console.log(existing);

            return response.status(HttpStatus.OK).json({
                message: 'Facture found  successfully',

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
        @Body() updateFactureDto: UpdateFactureDto,
    ) {
        try {
            const updatefacture = await this.factureService.updatefacture(
                id,
                updateFactureDto,
            );
            return response.status(HttpStatus.OK).json({
                message: 'facture updated  successfully',

                data: updatefacture,
                status: HttpStatus.OK,
            });
        } catch (err) {
            console.log(err);
            
            return response.status(HttpStatus.BAD_REQUEST).json({
                message: err.response,
                status: HttpStatus.BAD_REQUEST,
                data: null,
            });
        }
    }
    // @Delete('/:id')
    // async deleteArticle(@Res() response, @Param('id') ArticleId: number) {
    //     try {
    //         console.log(ArticleId);
    //         const deletedProduct = await this.factureService.deleteArticle(ArticleId);
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
    async remove(@Res() response, @Param('id') id: number): Facture {
        try {
            console.log(id);

            const existing = await this.factureService.deleteFactureById(id);
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

