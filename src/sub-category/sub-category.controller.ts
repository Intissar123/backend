import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { CreateSubCategoryDto } from './dto/create-sub-category.dto';
import { SubCategoryService } from './sub-category.service';
import { SubCategory } from '../../models/subcategory.js'
import { UpdateSubCategoryDto } from './dto/update-sub-category.dto';

@Controller('sub-category')
export class SubCategoryController {
    constructor(private readonly subCategoryService: SubCategoryService) { }

    @Post()
    async create(@Res() response, @Body() createSubCategoryDto: CreateSubCategoryDto) {
        try {
            const newSubCategory = await this.subCategoryService.createSubCategory(createSubCategoryDto);
            response.status(HttpStatus.CREATED).json({
                status: HttpStatus.CREATED,
                data: newSubCategory
            });
        }
        catch (error) {
            response.status(HttpStatus.BAD_REQUEST).send("saving " + JSON.stringify(error));
        }
    }
    @Get()
    async findAll(@Res() response) {
        try {
            const SubCategory = await this.subCategoryService.getAllSubCategories();
            response.status(HttpStatus.OK).json({
                message: 'all categories data successfully',
                status: HttpStatus.OK,
                data: SubCategory
            });

        } catch (error) {
            response.status(HttpStatus.BAD_REQUEST).send("saving " + JSON.stringify(error));
        }

    }
    @Get('/:id')
    async getSubCategory(@Res() response, @Param('id') id: number) {
        try {
            console.log(id);

            const existing = await this.subCategoryService.getSubCategoryById(id);
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
    async updateSubCategory(@Res() response, @Param('id') id: number, @Body() updateSubCategoryDto: UpdateSubCategoryDto) {
        try {
            console.log(id);

            const existing = await this.subCategoryService.updateSubCategory(id, updateSubCategoryDto);
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
    async remove(@Res() response, @Param('id') id: number): SubCategory {
        try {
            console.log(id);

            const existing = await this.subCategoryService.deleteSubCategoryById(id);
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
