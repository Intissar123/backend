import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Articles } from './articles.interface';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
const db = require('../../models');
const ERRORS = require('../../config/errors-msgs.js');
const { article, category } = require('../../models');

@Injectable()
export class ArticlesService {
    async createArticle(createArticleDto:CreateArticleDto ){
        try {
            const subcatgExist = await db.subcategory.findByPk(createArticleDto.subcategoryId)

            if (!subcatgExist) {
                return `subcategoryId ${createArticleDto.subcategoryId} not found!`
            } else {
                return await db.article.create(createArticleDto);
            }
        } catch (error) {
            console.log(error);
            throw new Error(`failed  to create article ${error.message}`);
        }
    }
    async getAllArticles(): Promise<Articles[]> {
        const article = await db.article.findAll();
        if (!article || article.length == 0) {
            throw new NotFoundException('articles data not found!');
        }
        return article;
    }
    async getArticleById(id: number): Promise<Articles> {
        const article = await db.article.findByPk(id);
        if (!article) {
            throw new NotFoundException(`Article#${id} not found`);
        }
        return article;
    }
    async getProductBySlug(slug: string) {
        try {
            const product = await db.article.findOne({
                //include: [category],
                where: { isDeleted: false, slug: slug },
            });
            if (!product) {
                throw new HttpException(
                    `${ERRORS.RESOURCE_NOT_FOUND}`,
                    HttpStatus.NOT_FOUND,
                );
            }
            return product;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }
    async updatearticle(id: number, data: UpdateArticleDto,): Promise<UpdateArticleDto | string> {
        try {
            const subcatgExist = await db.subcategory.findByPk(data.subcategoryId)
            const existing = await db.article.findByPk(id);
            if (!existing) { return ` article not found!` }
            //else if (!subcatgExist) { return ` subcatg not found!` }
            //else if (data.subcategoryId == null || subcatgExist) {
                await db.article.update(data, { where: { id: id } })
                return `article with ID ${id} updated successfully:${JSON.stringify(data)}`;
            //}
        }
        catch (error) { throw new NotFoundException(`#${data.subcategoryId}  subcategoryId  not found!`); }
    }
    
    // async deleteArticle(ArticleId: number): Promise<Articles> {
    //     console.log(ArticleId);
        
    //     const deletedArticle = await db.article.findByIdAndDelete(ArticleId);
    //     if (!deletedArticle) {
    //         throw new NotFoundException(`Article#${ArticleId} not found`);
    //     }
    //     return deletedArticle;
    // }

    async deleteArticleById(id: number): Promise < string > {
            const article = await this.getArticleById(id);
            if(!article) {
                throw new NotFoundException(`Article #${id} not found`);
            } else {
                await db.article.destroy({ where: { id: id } });
                return `Article with ID ${id} deleted successfully.`;
            }
        }
    }

