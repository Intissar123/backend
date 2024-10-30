import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { Cmdfournisseur } from '../../models/cmdfournisseur.js'
import { CreateCmdfournisseurDto } from './dto/create-cmdfournisseur.dto';
import { CmdfournisseurService } from './cmdfournisseur.service';
import { UpdateCmdfournisseurDto } from './dto/update-cmdfournisseur.dto.js';
import { log } from 'console';

@Controller('Cmdfournisseur')
export class CmdfournisseurController {
    constructor(private readonly cmdfournisseurService:CmdfournisseurService) { }

    @Post()
    async create(@Res() response, @Body() createCmdfournisseurDto: CreateCmdfournisseurDto) {
        try {
            
            console.log(createCmdfournisseurDto);
            
            const ff = await this.cmdfournisseurService.createCmdfournisseur(createCmdfournisseurDto);
              
            response.status(HttpStatus.CREATED).json({
                message: 'Cmdfournisseur  has been created successfully',
                status: HttpStatus.CREATED,
                data: ff
            });
        }
        catch (error) { console.log(error);
           
            
            response.status(HttpStatus.BAD_REQUEST).send("saving " + JSON.stringify(error));
        }
    }
    @Get()
    async findAll(@Res() response) {
        try {
            const Cmdfournisseur = await this.cmdfournisseurService.getAllCmdfournisseur();
            response.status(HttpStatus.OK).json({
                message: 'all Commande data successfully',
                status: HttpStatus.OK,
                data: Cmdfournisseur
            });

        } catch (error) {
            response.status(HttpStatus.BAD_REQUEST).send("saving " + JSON.stringify(error));
        }

    }
    @Get('/:id')
    async getCmdfournisseur(@Res() response, @Param('id') id: number) {
        try {
            console.log(id);

            const existing = await this.cmdfournisseurService.getCmdfournisseurById(id);
            console.log(existing);

            return response.status(HttpStatus.OK).json({
                message: 'Commande found  successfully',

                data: existing,
                status: HttpStatus.OK,
            });
        } catch (err) {
            response.status(HttpStatus.BAD_REQUEST).send("saving " + JSON.stringify(err));


        }
    }
    @Put('/:id')
    async updateCmdfournisseur(@Res() response, @Param('id') cmdfournissseurId: number, @Body() updateCmdfournisseurDto: UpdateCmdfournisseurDto) {
        try {
            console.log(cmdfournissseurId);

            const existing = await this.cmdfournisseurService.updatecmdfournisseur(cmdfournissseurId, updateCmdfournisseurDto);
            console.log(existing);
            return response.status(HttpStatus.OK).json({
                message: 'cmdfournisseur has been  successfully update',
                data: existing,
                status: HttpStatus.OK

            });
        } catch (err) {
            console.log(err);
            
            response.status(HttpStatus.BAD_REQUEST).send("saving " + JSON.stringify(err));


        }
    }


    @Delete('/:id')
    async remove(@Res() response, @Param('id') id: number): Cmdfournisseur {
        try {
            console.log(id);

            const existing = await this.cmdfournisseurService.deleteCmdfournisseurById(id);
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


