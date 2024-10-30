import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { TvasService } from './tvas.service';
import { CreateTvaDto } from './dto/create-tva.dto';
import { Tvas } from '../../models/article.js'
import { log } from 'console';
import { UpdateTvaDto } from './dto/update-tva.dto';

@Controller('tvas')
export class TvasController {
    constructor(private readonly tvaService: TvasService) { }

    @Post()
    async create(@Res() response, @Body() createTvaDto: CreateTvaDto) {
        try {
            const newTva = await this.tvaService.createTva(createTvaDto);
            response.status(HttpStatus.CREATED).json({
                message: 'article has been created successfully',
                status: HttpStatus.CREATED,
                data: newTva
            });
        }
        catch (error) {
            response.status(HttpStatus.BAD_REQUEST).send("saving " + JSON.stringify(error));
        }
    }
    @Get()
    async findAll(@Res() response) {
        try {
            const tvas = await this.tvaService.getAllTva();
            response.status(HttpStatus.OK).json({
                message: 'all tva data successfully',
                status: HttpStatus.OK,
                data: tvas
            });

        } catch (error) {
            response.status(HttpStatus.BAD_REQUEST).send("saving " + JSON.stringify(error));
        }

    }
    @Get('/:id')
    async getTva(@Res() response, @Param('id') id: number) {
        try {
            console.log(id);

            const existing = await this.tvaService.getTvaById(id);
            console.log(existing);

            return response.status(HttpStatus.OK).json({
                message: 'tva found  successfully',

                data: existing,
                status: HttpStatus.OK,
            });
        } catch (err) {
            response.status(HttpStatus.BAD_REQUEST).send("saving " + JSON.stringify(err));


        }
    }
    @Put('/:id')
    async updateTva(@Res() response, @Param('id') TvaId: number, @Body() updateTvaDto: UpdateTvaDto) {
        try {
            console.log(TvaId);

            const existing = await this.tvaService.updateTva(TvaId, updateTvaDto);
            console.log(existing);
            return response.status(HttpStatus.OK).json({
                message: 'Article has been  successfully update',
                data: existing,
                status: HttpStatus.OK

            });
        } catch (err) {
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
    async remove(@Res() response, @Param('id') id: number): Tvas {
        try {
            console.log(id);

            const existing = await this.tvaService.deleteTvaById(id);
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

