// import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
// import { CreateServiceSubCategoryDto } from './dto/create-service-subcategory.dto';
// import { UpdateServiceSubCategoryDto } from './dto/update-service-subcategory.dto';
// import { ServiceSubCategoryService } from './service-sub-category.service';
// import { ServiceSubCategory } from '../../models/servicesubCategory.js'

// @Controller('servicesubcategory')
// export class ServiceSubCategoryController {
//     constructor(private readonly servicesubCategoryService: ServiceSubCategoryService) { }

//     @Post()
//     async create(@Res() response, @Body() createServiceSubCategoryDto: CreateServiceSubCategoryDto) {
//         try {
//             console.log(createServiceSubCategoryDto);
            
//             const newSub = await this.servicesubCategoryService.createServiceSubCategory(createServiceSubCategoryDto)
//             console.log(newSub, "Controller---------------")
//             response.status(HttpStatus.CREATED).json({
//                 message: 'servicesubcategory has been created successfully',
//                 status: HttpStatus.CREATED,
//                 data: newSub
//             })
//         }
//         catch (error) {
//             response.status(HttpStatus.BAD_REQUEST).send("saving " + JSON.stringify(error));
//         }
//     }
//     @Get()
//     async findAll(@Res() response) {
//         try {
//             const SubCategory = await this.servicesubCategoryService.getAllServiceCategories();
//             response.status(HttpStatus.OK).json({
//                 message: 'all categories data successfully',
//                 status: HttpStatus.OK,
//                 data: SubCategory
//             });

//         } catch (error) {
//             response.status(HttpStatus.BAD_REQUEST).send("saving " + JSON.stringify(error));
//         }

//     }
//     @Get('/:id')
//     async getSubCategory(@Res() response, @Param('id') id: number) {
//         try {
//             console.log(id);

//             const existing = await this.servicesubCategoryService.getServiceCategoryById(id);
//             console.log(existing);

//             return response.status(HttpStatus.OK).json({
//                 message: 'Category found  successfully',

//                 data: existing,
//                 status: HttpStatus.OK,
//             });
//         } catch (err) {
//             response.status(HttpStatus.BAD_REQUEST).send("saving " + JSON.stringify(err));


//         }
//     }
//     @Put('/:id')
//     async updateSubCategory(@Res() response, @Param('id') serviceSubCategoryId: number, @Body() updateSubCategoryDto: UpdateServiceSubCategoryDto) {
//         try {
//             console.log(serviceSubCategoryId);

//             const existing = await this.servicesubCategoryService.updateServiceCategory(serviceSubCategoryId, updateSubCategoryDto);
//             console.log(existing);
//             return response.status(HttpStatus.OK).json({
//                 message: 'Category has been  successfully update',
//                 data: existing,
//                 status: HttpStatus.OK

//             });
//         } catch (err) {
//             response.status(HttpStatus.BAD_REQUEST).send("saving " + JSON.stringify(err));


//         }
//     }
//     // @Delete('/:id')
//     // async deleteArticle(@Res() response, @Param('id') ArticleId: number) {
//     //     try {
//     //         console.log(ArticleId);
//     //         const deletedProduct = await this.articleService.deleteArticle(ArticleId);
//     //         return response.status(HttpStatus.OK).json({
//     //             message: 'Article deleted  successfully',
//     //             data: deletedProduct,
//     //             status: HttpStatus.OK

//     //         });
//     //     } catch (err) {
//     //         response.status(HttpStatus.BAD_REQUEST).send("saving " + JSON.stringify(err));


//     //     }
//     // }

//     @Delete('/:id')
//     async remove(@Res() response, @Param('id') id: number): ServiceSubCategory {
//         try {
//             console.log(id);

//             const existing = await this.servicesubCategoryService.deleteServiceCategoryById(id);
//             console.log(existing);

//             response.status(HttpStatus.OK).json({
//                 message: 'delete successfully',

//                 data: existing,
//                 status: HttpStatus.OK,
//             });
//         } catch (err) {
//             response.status(HttpStatus.BAD_REQUEST).send("saving " + JSON.stringify(err));


//         }
//     }

// }

