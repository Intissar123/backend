import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { ServiceCategoryService } from './service-category.service';
import { CreateServiceCategoryDto } from './dto/create-service-category.dto';
import { ServiceCategory } from '../../models/category.js'
import { UpdateServiceCategoryDto } from './dto/update-service-category.dto';

@Controller('servicecategories')
export class ServiceCategoryController {
    constructor(private readonly servicecategorieService: ServiceCategoryService) { }

    @Post()
    async create(@Res() response, @Body() createserviceCategoryDto: CreateServiceCategoryDto) {
        try {
            const newCategory = await this.servicecategorieService.createServiceCategory(createserviceCategoryDto);
            response.status(HttpStatus.CREATED).json({
                message: 'servicecategorie has been created successfully',
                status: HttpStatus.CREATED,
                data: newCategory
            });
        }
        catch (error) {
            response.status(HttpStatus.BAD_REQUEST).send("saving " + JSON.stringify(error));
        }
    }
    @Get()
    async findAll(@Res() response) {
        try {
            const categories = await this.servicecategorieService.getAllServiceCategories();
            response.status(HttpStatus.OK).json({
                message: 'all categories data successfully',
                status: HttpStatus.OK,
                data: categories
            });

        } catch (error) {
            response.status(HttpStatus.BAD_REQUEST).send("saving " + JSON.stringify(error));
        }

    }
    @Get('/:id')
    async getCategory(@Res() response, @Param('id') id: number) {
        try {
            console.log(id);

            const existing = await this.servicecategorieService.getServiceCategoryById(id);
            console.log(existing);

            return response.status(HttpStatus.OK).json({
                message: 'Category found  successfully',

                data: existing,
                status: HttpStatus.OK,
            });
        } catch (err) {
            response.status(HttpStatus.BAD_REQUEST).send("saving " + JSON.stringify(err));


        }
    }
    @Put('/:id')
    async updateCategory(@Res() response, @Param('id') CategoryId: number, @Body() updateCategoryDto: UpdateServiceCategoryDto) {
        try {
            console.log(CategoryId);

            const existing = await this.servicecategorieService.updateCategoryById(CategoryId, updateCategoryDto);
            console.log(existing);
            return response.status(HttpStatus.OK).json({
                message: 'Category has been  successfully update',
                data: existing,
                status: HttpStatus.OK

            });
        } catch (err) {
            response.status(HttpStatus.BAD_REQUEST).send("saving " + JSON.stringify(err));


        }
    }
    // @Delete('/:id')
    // async deleteArticle(@Res() response, @Param('id') ArticleId: number) {
    //     try {
    //         console.log(ArticleId);
    //         const deletedProduct = await this.articleService.deleteArticle(ArticleId);
    //         return response.status(HttpStatus.OK).json({
    //             message: 'Article deleted  successfully',
    //             data: deletedProduct,
    //             status: HttpStatus.OK

    //         });
    //     } catch (err) {
    //         response.status(HttpStatus.BAD_REQUEST).send("saving " + JSON.stringify(err));


    //     }
    // }

    @Delete('/:id')
    async remove(@Res() response, @Param('id') id: number): ServiceCategory {
        try {
            console.log(id);

            const existing = await this.servicecategorieService.deleteServiceCategoryById(id);
            console.log(existing);

            response.status(HttpStatus.OK).json({
                message: 'delete successfully',

                data: existing,
                status: HttpStatus.OK,
            });
        } catch (err) {
            response.status(HttpStatus.BAD_REQUEST).send("saving " + JSON.stringify(err));


        }
    }

}

