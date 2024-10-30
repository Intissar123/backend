import { Injectable, NotFoundException } from '@nestjs/common';
import { ServiceCategory } from './service-category.interface';
import { CreateServiceCategoryDto } from './dto/create-service-category.dto';
import { UpdateServiceCategoryDto } from './dto/update-service-category.dto';
const db = require('../../models');

@Injectable()
export class ServiceCategoryService {
    async createServiceCategory(data: any): Promise<ServiceCategory> {
        try {
            const servicecategory = await db.serviceCategory.create(data)
            //console.log(db);
            //console.log(db.Articles);
            return servicecategory;
        } catch (error) {
            throw new Error(`failed  to create servicecategory ${error.message}`);
        }
    }
    async getAllServiceCategories(): Promise<ServiceCategory[]> {
        const servicecategory = await db.serviceCategory.findAll();
        if (!servicecategory || servicecategory.length == 0) {
            throw new NotFoundException('servicecategory data not found!');
        }
        return servicecategory;
    }
    async getServiceCategoryById(id: number): Promise<ServiceCategory> {
        const servicecategory = await db.serviceCategory.findByPk(id);
        if (!servicecategory) {
            throw new NotFoundException(`servicecategory#${id} not found`);
        }
        return servicecategory;
    }
    async updateCategoryById(id: number, data: UpdateServiceCategoryDto): Promise<UpdateServiceCategoryDto | string> {
        try {
            const category = await this.getServiceCategoryById(id);
            if (!category) {
                throw new NotFoundException(`category #${id} not found`);
            } else {
                await db.serviceCategory.update(data, { where: { id: id } });
                return data;
            }
        }
        catch (error) {
            throw new Error(`failed to get the categoryService ${error.message}`);
        }
    }
    // async deleteArticle(ArticleId: number): Promise<Articles> {
    //     console.log(ArticleId);

    //     const deletedArticle = await db.article.findByIdAndDelete(ArticleId);
    //     if (!deletedArticle) {
    //         throw new NotFoundException(`Article#${ArticleId} not found`);
    //     }
    //     return deletedArticle;
    // }

    async deleteServiceCategoryById(id: number): Promise<string> {
        const servicecategory = await this.getServiceCategoryById(id);
        if (!servicecategory) {
            throw new NotFoundException(`servicecategory #${id} not found`);
        } else {
            await db.serviceCategory.destroy({ where: { id: id } });
            return `servicecategory with ID ${id} deleted successfully.`;
        }
    }
}

