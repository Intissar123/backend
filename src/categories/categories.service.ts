import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Categories } from './categories.interface';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
const db = require('../../models');
const ERRORS = require('../../config/errors-msgs.js');
@Injectable()
export class CategoriesService {
    async createCategory(data: any): Promise<Categories> {
        try {
            const c = await db.category.create(data)
            //console.log(db);
            //console.log(db.Articles);
            return c;
        } catch (error) {
            throw new HttpException(`${error.message}`, HttpStatus.CONFLICT);
        }
    }
    async getAllCategories(): Promise<Categories[]> {
        try {
            const category = await db.category.findAll({
               
            });
       
            return category;
        } catch (error) {
            throw new HttpException(
                `${error.message}`,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
    
    async getCategoryById(id: number): Promise<Categories> {
        const category = await db.category.findByPk(id);
        if (!category) {
            throw new HttpException(
                `${ERRORS.RESOURCE_NOT_FOUND}`,
                HttpStatus.NOT_FOUND,
            );
        }
        return category;
    } catch(error) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }

    
    async updatecategorie(id: number, data: UpdateCategoryDto,): Promise<UpdateCategoryDto | string> {
        try {
            const existing = await db.category.findByPk(id);
            if (!existing) {
                return `category not found!`
            } else if (existing != null) {
                await db.category.update(data, { where: { id: id } })
                return existing;
            } else throw new NotFoundException(`category #${id} not found`);
        } catch (error) { throw new HttpException(error.message, HttpStatus.NOT_FOUND); }
    }

    // async deleteArticle(ArticleId: number): Promise<Articles> {
    //     console.log(ArticleId);

    //     const deletedArticle = await db.article.findByIdAndDelete(ArticleId);
    //     if (!deletedArticle) {
    //         throw new NotFoundException(`Article#${ArticleId} not found`);
    //     }
    //     return deletedArticle;
    // }

    async deleteCategoryById(id: number): Promise<string> {
        const category = await this.getCategoryById(id);
        if (!category) {
            throw new NotFoundException(`category #${id} not found`);
        } else {
            await db.category.destroy({ where: { id: id } });
            return `category with ID ${id} deleted successfully.`;
        }
    }
}
