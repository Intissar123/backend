import { Injectable, NotFoundException } from '@nestjs/common';
import { Tvas } from './Tvas.interface';
import { CreateTvaDto } from './dto/create-tva.dto';
import { UpdateTvaDto } from './dto/update-tva.dto';
const db = require('../../models');

@Injectable()
export class TvasService {
    async createTva(data: any): Promise<Tvas> {
        try {
            const tva = await db.tva.create(data)
            //console.log(db);
            //console.log(db.Articles);
            return tva;
        } catch (error) {
            throw new Error(`failed  to create article ${error.message}`);
        }
    }
    async getAllTva(): Promise<Tvas[]> {
        const tva = await db.tva.findAll();
        if (!tva || tva.length == 0) {
            throw new NotFoundException('articles data not found!');
        }
        return tva;
    }
    async getTvaById(id: number): Promise<Tvas> {
        const tva = await db.tva.findByPk(id);
        if (!tva) {
            throw new NotFoundException(`Article#${id} not found`);
        }
        return tva;
    }
    async updateTva(
        TvaId: number,
        updateTvaDto: UpdateTvaDto,
    ): Promise<Tvas> {
        const existing = await db.tva.findByIdAndUpdate(
            TvaId,
            updateTvaDto,
            { new: true },
        );

        if (!existing) {
            throw new NotFoundException(`Article #${TvaId} not found`);
        }
        return existing;
    }
    // async deleteArticle(ArticleId: number): Promise<Articles> {
    //     console.log(ArticleId);

    //     const deletedArticle = await db.article.findByIdAndDelete(ArticleId);
    //     if (!deletedArticle) {
    //         throw new NotFoundException(`Article#${ArticleId} not found`);
    //     }
    //     return deletedArticle;
    // }

    async deleteTvaById(id: number): Promise<string> {
        const tva = await this.getTvaById(id);
        if (!tva) {
            throw new NotFoundException(`tva #${id} not found`);
        } else {
            await db.tva.destroy({ where: { id: id } });
            return `tva with ID ${id} deleted successfully.`;
        }
    }
}

