import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { DevisService } from './devis.service';
import { CreateDevisDto } from './dto/create-devis.dto';
import { Devis } from '../../models/article.js'
import { log } from 'console';
import { UpdateDevisDto } from './dto/update-devis.dto';

@Controller('devis')
export class DevisController {
    constructor(private readonly devisService: DevisService) { }

    @Post()
    async create(@Res() response, @Body() createDevisDto: CreateDevisDto) {
        try {
            const newDevis = await this.devisService.createDevis(createDevisDto);
            console.log(newDevis)
            response.status(HttpStatus.CREATED).json({
                message: 'devis has been created successfully',
                status: HttpStatus.CREATED,
                data: newDevis
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
            const devis = await this.devisService.getAllDevis();
            response.status(HttpStatus.OK).json({
                message: 'all article data successfully',
                status: HttpStatus.OK,
                data: devis
            });

        } catch (error) {
            response.status(HttpStatus.BAD_REQUEST).send("saving " + JSON.stringify(error));
        }

    }
    @Get('/:id')
    async getDevis(@Res() response, @Param('id') id: number) {
        try {
            console.log(id);

            const existing = await this.devisService.getDevisById(id);
            console.log(existing);

            return response.status(HttpStatus.OK).json({
                message: 'Devis found  successfully',

                data: existing,
                status: HttpStatus.OK,
            });
        } catch (err) {
            response.status(HttpStatus.BAD_REQUEST).send("saving " + JSON.stringify(err));


        }
    }
    // @Put('/:id')
    // async update(
    //     @Res() response,
    //     @Param('id') id: number,
    //     @Body() updateDevisDto: UpdateDevisDto,
    // ) {
    //     try {
    //         const updatedevis = await this.devisService.updatedevis(
    //             id,
    //             updateDevisDto,
    //         );
    //         return response.status(HttpStatus.OK).json({
    //             message: 'devis updated  successfully',

    //             data: updatedevis,
    //             status: HttpStatus.OK,
    //         });
    //     } catch (err) {
    //         return response.status(HttpStatus.BAD_REQUEST).json({
    //             message: err.response,
    //             status: HttpStatus.BAD_REQUEST,
    //             data: null,
    //         });
    //     }
    // }
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
    async remove(@Res() response, @Param('id') id: number): Devis {
        try {
            console.log(id);

            const existing = await this.devisService.deleteDevisById(id);
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

