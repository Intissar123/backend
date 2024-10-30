import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { Devis } from './devis.interface';
import { CreateDevisDto } from './dto/create-devis.dto';
import { UpdateDevisDto } from './dto/update-devis.dto';
const db = require('../../models');

@Injectable()
export class DevisService {
    async createDevis(createDevisDto: CreateDevisDto) {
        try {
            const ServiceExist = await db.service.findByPk(createDevisDto.serviceId)
            if (!ServiceExist) {
                return `#${createDevisDto.serviceId} not found`;
            } else {
                return await db.devis.create(createDevisDto);
                
            }
        }
        catch (error) {
            throw new HttpException(error.message, 400);
        }
    }

    async getAllDevis(): Promise<Devis[]> {
        const Devis = await db.devis.findAll();
        if (!Devis || Devis.length == 0) {
            throw new NotFoundException('articles data not found!');
        }
        return Devis;
    }
    async getDevisById(id: number): Promise<Devis> {
        const Devis = await db.devis.findByPk(id);
        if (!Devis) {
            throw new NotFoundException(`Devis#${id} not found`);
        }
        return Devis;
    }
    // async updatedevis(id: number, data: UpdateDevisDto,): Promise<UpdateDevisDto | string> {
    //     try {
    //         const existing = await db.devis.findByPk(id);
    //         if (!existing) {
    //             return `devis not found!`
    //         } else if (existing != null) {
    //             await db.devis.update(data, { where: { id: id } })
    //             return existing;
    //         } else throw new NotFoundException(`devis #${id} not found`);
    //     } catch (error) { throw new Error(`failed to get the devis ${error.message}`) }
    // }
    // async deleteArticle(ArticleId: number): Promise<Articles> {
    //     console.log(ArticleId);

    //     const deletedArticle = await db.article.findByIdAndDelete(ArticleId);
    //     if (!deletedArticle) {
    //         throw new NotFoundException(`Article#${ArticleId} not found`);
    //     }
    //     return deletedArticle;
    // }

    async deleteDevisById(id: number): Promise<string> {
        const Devis = await this.getDevisById(id);
        if (!Devis) {
            throw new NotFoundException(`Devis #${id} not found`);
        } else {
            await db.devis.destroy({ where: { id: id } });
            return `Devis with ID ${id} deleted successfully.`;
        }
    }
}

