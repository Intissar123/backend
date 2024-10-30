import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { FournisseurService } from './fournisseur.service';
import { CreateFournisseurDto } from './dto/create-fournisseur.dto';
import { Fournisseur } from '../../models/fournisseur.js'
import { UpdateFournisseurDto } from './dto/update-fournisseur.dto';

@Controller('Fournisseurs')
export class FournisseurController {
    constructor(private readonly fournisseurService: FournisseurService) { }

    @Post()
    async create(@Res() response, @Body() createFournisseurDto: CreateFournisseurDto) {
        try {
            const newFournisseur = await this.fournisseurService.createfournisseur(createFournisseurDto);
            response.status(HttpStatus.CREATED).json({
                message: 'Fournisseur has been created successfully',
                status: HttpStatus.CREATED,
                data: newFournisseur
            });
        }
        catch (error) {
            response.status(HttpStatus.BAD_REQUEST).send("saving " + JSON.stringify(error));
        }
    }
    @Get()
    async findAll(@Res() response) {
        try {
            const Fournisseurs = await this.fournisseurService.getAllFournisseur();
            response.status(HttpStatus.OK).json({
                message: 'all Fournisseur data successfully',
                status: HttpStatus.OK,
                data: Fournisseurs
            });

        } catch (error) {
            response.status(HttpStatus.BAD_REQUEST).send("saving " + JSON.stringify(error));
        }

    }
    @Get('/:id')
    async getFournisseur(@Res() response, @Param('id') id: number) {
        try {
            console.log(id);

            const existing = await this.fournisseurService.getfournisseurById(id);
            console.log(existing);

            return response.status(HttpStatus.OK).json({
                message: 'Fournisseur found  successfully',

                data: existing,
                status: HttpStatus.OK,
            });
        } catch (err) {
            response.status(HttpStatus.BAD_REQUEST).send("saving " + JSON.stringify(err));


        }
    }
    @Put('/:id')
    async updateFournisseur(@Res() response, @Param('id') id: number, @Body() updateFournisseurDto: UpdateFournisseurDto) {
        try {
            console.log(id);

            const existing = await this.fournisseurService.updatefournisseur(id, updateFournisseurDto);
            console.log(existing);
            return response.status(HttpStatus.OK).json({
                message: 'Fournisseur has been  successfully update',
                data: existing,
                status: HttpStatus.OK

            });
        } catch (err) {
            console.log(err);
            
            response.status(HttpStatus.BAD_REQUEST).send("saving " + JSON.stringify({
                message: 'Fournisseur not found',
                data: err,
                status: HttpStatus.BAD_REQUEST

            }));
            


        }
    }
    // @Delete('/:id')
    // async deleteFournisseur(@Res() response, @Param('id') FournisseurId: number) {
    //     try {
    //         console.log(FournisseurId);
    //         const deletedProduct = await this.FournisseurService.deleteFournisseur(FournisseurId);
    //         return response.status(HttpStatus.OK).json({
    //             message: 'Fournisseur deleted  successfully',
    //             data: deletedProduct,
    //             status: HttpStatus.OK

    //         });
    //     } catch (err) {
    //         response.status(HttpStatus.BAD_REQUEST).send("saving " + JSON.stringify(err));


    //     }
    // }

    @Delete('/:id')
    async remove(@Res() response, @Param('id') id: number): Fournisseur {
        try {
            console.log(id);

            const existing = await this.fournisseurService.deletefournisseurById(id);
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

