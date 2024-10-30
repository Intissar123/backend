import { Injectable, NotFoundException, HttpException } from '@nestjs/common';
import { Services } from './services.interface';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
const db = require('../../models');

@Injectable()
export class ServicesService {
    async createService(createServiceDto: CreateServiceDto) {
        try {
            const categoryServiceExist = await db.serviceCategory.findByPk(createServiceDto.serviceCategoryId)

            if (!categoryServiceExist) {
                return `#${createServiceDto.serviceCategoryId} not found!`
            } else {
                return await db.service.create(createServiceDto);
            }
        } catch (error) {
            console.log(error);
            throw new Error(`failed  to create service ${error.message}`);
        }
    }
    async getAllServices(): Promise<Services[]> {
        const service = await db.service.findAll();
        if (!service || service.length == 0) {
            throw new NotFoundException('service data not found!');
        }
        return service;
    }
    async getServiceById(id: number): Promise<Services> {
        const service = await db.service.findByPk(id);
        if (!service) {
            throw new NotFoundException(`service#${id} not found`);
        }
        return service;
    }
    async updateservice(id: number, data: UpdateServiceDto,): Promise<UpdateServiceDto | string> {
        try {
            const existing = await db.service.findByPk(id);
            if (!existing) {
                return `service not found!`
            } else if (existing != null) {
                await db.service.update(data, { where: { id: id } })
                return existing;
            } else throw new NotFoundException(`service #${id} not found`);
        } catch (error) { throw new Error(`failed to get the service ${error.message}`) }
    }

    // async deleteArticle(ArticleId: number): Promise<Articles> {
    //     console.log(ArticleId);

    //     const deletedArticle = await db.article.findByIdAndDelete(ArticleId);
    //     if (!deletedArticle) {
    //         throw new NotFoundException(`Article#${ArticleId} not found`);
    //     }
    //     return deletedArticle;
    // }

    async deleteServiceById(id: number): Promise<string> {
        const service = await this.getServiceById(id);
        if (!service) {
            throw new NotFoundException(`service #${id} not found`);
        } else {
            await db.service.destroy({ where: { id: id } });
            return `service with ID ${id} deleted successfully.`;
        }
    }
}

