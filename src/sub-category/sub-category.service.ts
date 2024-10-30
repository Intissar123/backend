import { Injectable, NotFoundException } from '@nestjs/common';
import { SubCategory } from './sub-category.interface';
import { CreateSubCategoryDto } from './dto/create-sub-category.dto';
import { UpdateSubCategoryDto } from './dto/update-sub-category.dto';
const db = require('../../models');

@Injectable()
export class SubCategoryService {
    async createSubCategory(createSubcategoryDto: CreateSubCategoryDto) {
        try {
            const categoryExiting = await db.category.findByPk(createSubcategoryDto.categoryId)
            console.log(categoryExiting)

            if (!categoryExiting) { return `categoryId ${createSubcategoryDto.categoryId} not found !` } else {
                return await db.subcategory.create(createSubcategoryDto);
            }
            //console.log(db);
            //console.log(db.Articles);
        } catch (error) {
            throw new Error(`failed  to create article ${error.message}`);
        }
    }
    async getAllSubCategories(): Promise<SubCategory[]> {
        const Subcategory = await db.subcategory.findAll();
        if (!Subcategory || Subcategory.length == 0) {
            throw new NotFoundException('subcategory data not found!');
        }
        return Subcategory;
    }
    async getSubCategoryById(id: number): Promise<SubCategory> {
        const Subcategory = await db.subcategory.findByPk(id);
        if (!Subcategory) {
            throw new NotFoundException(`subcategory#${id} not found`);
        }
        return Subcategory;
    }
    async updateSubCategory(id: number, data: UpdateSubCategoryDto,): Promise<UpdateSubCategoryDto | string> {
        try {
            const catgExist = await db.category.findByPk(data.categoryId)
            const existing = await db.subcategory.findByPk(id);
            if (!existing) { return ` article not found!` }
            else if (!catgExist) { return ` catg not found!` }
            else if (data.categoryId == null || catgExist) {
                await db.subcategory.update(data, { where: { id: id } })
                return `article with ID ${id} updated successfully:${JSON.stringify(data)}`;
            }
        }
        catch (error) { throw new NotFoundException(`#${data.categoryId}  categoryId  not found!`); }
    }
    // async deleteArticle(ArticleId: number): Promise<Articles> {
    //     console.log(ArticleId);

    //     const deletedArticle = await db.article.findByIdAndDelete(ArticleId);
    //     if (!deletedArticle) {
    //         throw new NotFoundException(`Article#${ArticleId} not found`);
    //     }
    //     return deletedArticle;
    // }

    async deleteSubCategoryById(id: number): Promise<string> {
        const Subcategory = await this.getSubCategoryById(id);
        if (!Subcategory) {
            throw new NotFoundException(`category #${id} not found`);
        } else {
            await db.subcategory.destroy({ where: { id: id } });
            return `category with ID ${id} deleted successfully.`;
        }
    }
}

