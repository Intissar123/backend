import { Injectable, NotFoundException } from '@nestjs/common';
import { Cmdfournisseur } from './cmdfournisseur.interface';
import { CreateCmdfournisseurDto } from './dto/create-cmdfournisseur.dto';
import { UpdateCmdfournisseurDto } from './dto/update-cmdfournisseur.dto';
const db = require('../../models');

@Injectable()
export class CmdfournisseurService{
    async createCmdfournisseur(createCmdfournisseurDto: CreateCmdfournisseurDto) {
        try {
            const articleExiting = await db.article.findByPk(createCmdfournisseurDto.articleId)
            // console.log(articleExiting);
            const fournisseurExiting = await db.fournisseur.findByPk(createCmdfournisseurDto.fournisseurId)
            //console.log("+++++++++++++++");
            //await db.cmdfournisseur.create(createCmdfournisseurDto);
            //console.log(db.cmdfournisseur);
            if (!articleExiting) {
                console.log(articleExiting);
                return `articleId ${createCmdfournisseurDto.articleId} not found!`;
            } else if (!fournisseurExiting) {
                console.log(fournisseurExiting);
                return `fournisseurId ${createCmdfournisseurDto.fournisseurId} not found!`;
            }
            else {
                return await db.cmdfournisseur.create(createCmdfournisseurDto)
            }
        } catch (error) {
            throw new Error(`failed  to create Cmdfournisseur ${error.message}`);
        }
    }
    async getAllCmdfournisseur(): Promise<Cmdfournisseur[]> {
        const Cmdfournisseur = await db.cmdfournisseur.findAll();
        if (!Cmdfournisseur || Cmdfournisseur.length == 0) {
            throw new NotFoundException('Cmdfournisseur data not found!');
        }
        return Cmdfournisseur;
    }
    async getCmdfournisseurById(id: number): Promise<Cmdfournisseur> {
        const Cmdfournisseur = await db.cmdfournisseur.findByPk(id);
        console.log(Cmdfournisseur);
        
        if (!Cmdfournisseur) {
            throw new NotFoundException(`Cmdfournisseur#${id} not found`);
        }
        return Cmdfournisseur;
    }
    async updatecmdfournisseur(id: number, data: UpdateCmdfournisseurDto,): Promise<UpdateCmdfournisseurDto | string> {
        try {
            const articleExist = await db.article.findByPk(data.articleId)
            const fournisseurExist = await db.fournisseur.findByPk(data.fournisseurId)
            const existing = await db.cmdfournisseur.findByPk(id);
            if (!existing) { return ` cmdfournisseur not found!` }
            else if (!articleExist && !fournisseurExist) { return ` article not found!,fournisseur not found!` }
            else if (data.articleId == null || articleExist && data.fournisseurId == null || fournisseurExist) {
                await db.cmdfournisseur.update(data, { where: { id: id } })
                return `cmdfournisseur with ID ${id} updated successfully:${JSON.stringify(data)}`;
            }
        }
        catch (error) { throw new NotFoundException(`#${data.articleId}  articleId  not found!,#${data.fournisseurId}  fournisseurId  not found!`); }
    }

    async deleteCmdfournisseurById(id: number): Promise<string> {
        const Cmdfournisseur = await this.getCmdfournisseurById(id);
        if (!Cmdfournisseur) {
            throw new NotFoundException(`Cmdfournisseur #${id} not found`);
        } else {
            await db.cmdfournisseur.destroy({ where: { id: id } });
            return `Cmdfournisseur with ID ${id} deleted successfully.`;
        }
    }
}

