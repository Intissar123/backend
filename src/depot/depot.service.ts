import { Injectable, NotFoundException } from '@nestjs/common';
import { Depot} from './Depot.interface';
import { CreateDepotDto } from './dto/create-Depot.dto';
import { UpdateDepotDto } from './dto/update-Depot.dto';
const db = require('../../models');

@Injectable()
export class DepotsService {
    async createDepot(createDepotDto:CreateDepotDto) {
        try {
            const articleExiting = await db.article.findByPk(createDepotDto.articleId)

            if (!articleExiting) {
                return `articleId ${createDepotDto.articleId} not found !`
            } else {
                return await db.depot.create(createDepotDto)
            }
        } catch (error) {
            throw new Error(`failed  to create Depot ${error.message}`);
        }
    }
    async getAllDepots(): Promise<Depot[]> {
        const Depot = await db.depot.findAll();
        if (!Depot || Depot.length == 0) {
            throw new NotFoundException('Depots data not found!');
        }
        return Depot;
    }
    async getDepotById(id: number): Promise<Depot> {
        const Depot = await db.depot.findByPk(id);
        if (!Depot) {
            throw new NotFoundException(`Depot#${id} not found`);
        }
        return Depot;
    }
    async updatedepot(id: number, data: UpdateDepotDto,): Promise<UpdateDepotDto | string> {
        try {
            const articleExist = await db.article.findByPk(id)
            const existing = await db.depot.findByPk(id);
            if (data.articleId == null || articleExist) {
                await db.article.update(data, { where: { id: id } })
                return `article with ID ${id} updated successfully:${JSON.stringify(data)}`;
            }
            else if (existing != null) {
                await db.depot.update(data, { where: { id: id } })
                return existing;

            } else throw new NotFoundException(`depot #${id} not found`);
        } catch (error) { throw new Error(`failed to get the depot ${error.message}`) }
    }

    // async deleteDepot(DepotId: number): Promise<Depots> {
    //     console.log(DepotId);

    //     const deletedDepot = await db.Depot.findByIdAndDelete(DepotId);
    //     if (!deletedDepot) {
    //         throw new NotFoundException(`Depot#${DepotId} not found`);
    //     }
    //     return deletedDepot;
    // }

    async deleteDepotById(id: number): Promise<string> {
        const Depot = await this.getDepotById(id);
        if (!Depot) {
            throw new NotFoundException(`Depot #${id} not found`);
        } else {
            await db.depot.destroy({ where: { id: id } });
            return `Depot with ID ${id} deleted successfully.`;
        }
    }
}

