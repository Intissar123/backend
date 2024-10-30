import { Injectable, NotFoundException } from '@nestjs/common';
import { Facture } from './facture.interface';
import { CreateFactureDto } from './dto/create-facture.dto';
import { UpdateFactureDto } from './dto/update-facture.dto';
const db = require('../../models');

@Injectable()
export class FactureService {
    async createFacture(createFactureDto : CreateFactureDto) {
        try {
            const commandeExist = await db.commande.findByPk(createFactureDto.commandeId)
            if (!commandeExist) {
                return `commandeId ${createFactureDto.commandeId} not found!`
            } else {
                return await db.facture.create(createFactureDto);
            }
        } catch (error) {
            throw new Error(`failed  to create facture ${error.message}`);
        }
    }
    async getAllFactures(): Promise<Facture[]> {
        const facture = await db.facture.findAll();
        if (!facture || facture.length == 0) {
            throw new NotFoundException('facture data not found!');
        }
        return facture;
    }
    async getFactureById(id: number): Promise<Facture> {
        const facture = await db.facture.findByPk(id);
        if (!facture) {
            throw new NotFoundException(`facture#${id} not found`);
        }
        return facture;
    }
    async updatefacture(id: number, data: UpdateFactureDto,): Promise<UpdateFactureDto | string> {
        try {
            const commandeExist = await db.commande.findByPk(data.commandeId)
            const existing = await db.facture.findByPk(id);
            if (!existing) { return ` facture not found!` }
            else if (!commandeExist) { return ` commande not found!` }
            else if (data.commandeId == null || commandeExist) {
                await db.facture.update(data, { where: { id: id } })
                return `facture with ID ${id} updated successfully:${JSON.stringify(data)}`;
            }
        }
        catch (error) { throw new NotFoundException(`#${data.commandeId}  commandeId  not found!`); }
    }

    // async deleteArticle(ArticleId: number): Promise<Articles> {
    //     console.log(ArticleId);

    //     const deletedArticle = await db.article.findByIdAndDelete(ArticleId);
    //     if (!deletedArticle) {
    //         throw new NotFoundException(`Article#${ArticleId} not found`);
    //     }
    //     return deletedArticle;
    // }

    async deleteFactureById(id: number): Promise<string> {
        const facture = await this.getFactureById(id);
        if (!facture) {
            throw new NotFoundException(`facture #${id} not found`);
        } else {
            await db.facture.destroy({ where: { id: id } });
            return `facture with ID ${id} deleted successfully.`;
        }
    }
}

