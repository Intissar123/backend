// import { Injectable, NotFoundException } from '@nestjs/common';
// import { ServiceSubCategory } from './service-sub-category.interface';
// import { CreateServiceSubCategoryDto } from './dto/create-service-subcategory.dto';
// import { UpdateServiceSubCategoryDto } from './dto/update-service-subcategory.dto';
// const db = require('../../models');

// @Injectable()
// export class ServiceSubCategoryService {
//     async createServiceSubCategory(createServiceSubCategoryDto: CreateServiceSubCategoryDto){
//         try {
//             //console.log(createServiceSubCategoryDto);
            
//             const categoryExisting = await db.serviceCategory.findByPk(createServiceSubCategoryDto.ServicecategoryId)
//             //console.log(categoryExisting);
            
//             if (!categoryExisting) 
//             { return `ServicecategoryId ${createServiceSubCategoryDto.ServicecategoryId} not found !` }
//             else {
//                 //console.log(categoryExisting)
//                 return await db.servicesubCategory.create(createServiceSubCategoryDto);
              
//             }
//         } catch (error) {
//             throw new Error(`failed  to create servicecategoryId ${error.message}`);
//         }
//     }
//     async getAllServiceCategories(): Promise<ServiceSubCategory[]> {
//         const servicecategory = await db.serviceCategory.findAll();
//         if (!servicecategory || servicecategory.length == 0) {
//             throw new NotFoundException('servicecategory data not found!');
//         }
//         return servicecategory;
//     }
//     async getServiceCategoryById(id: number): Promise<ServiceSubCategory> {
//         const servicecategory = await db.serviceCategory.findByPk(id);
//         if (!servicecategory) {
//             throw new NotFoundException(`servicecategory#${id} not found`);
//         }
//         return servicecategory;
//     }
//     async updateServiceCategory(
//         ServiceCategoryId: number,
//         updateServiceCategoryDto: UpdateServiceSubCategoryDto,
//     ): Promise<ServiceSubCategory> {
//         const existing = await db.serviceCategory.findByIdAndUpdate(
//             ServiceCategoryId,
//             updateServiceCategoryDto,
//             { new: true },
//         );

//         if (!existing) {
//             throw new NotFoundException(`serviceCategory #${ServiceCategoryId} not found`);
//         }
//         return existing;
//     }
//     // async deleteArticle(ArticleId: number): Promise<Articles> {
//     //     console.log(ArticleId);

//     //     const deletedArticle = await db.article.findByIdAndDelete(ArticleId);
//     //     if (!deletedArticle) {
//     //         throw new NotFoundException(`Article#${ArticleId} not found`);
//     //     }
//     //     return deletedArticle;
//     // }

//     async deleteServiceCategoryById(id: number): Promise<string> {
//         const servicecategory = await this.getServiceCategoryById(id);
//         if (!servicecategory) {
//             throw new NotFoundException(`servicecategory #${id} not found`);
//         } else {
//             await db.serviceCategory.destroy({ where: { id: id } });
//             return `servicecategory with ID ${id} deleted successfully.`;
//         }
//     }
// }

