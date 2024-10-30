import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { category } from '../../models/category.js'
import { UpdateCategoryDto } from './dto/update-category.dto';
import { error } from 'console';
const ERRORS = require('../../config/errors-msgs.js');

@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) { }

    @Post()
    async create(@Res() response, @Body() createCategoryDto: CreateCategoryDto) {
        try {
            const newCategory = await this.categoriesService.createCategory(createCategoryDto);
            response.status(HttpStatus.CREATED).json({
                message: 'category has been created successfully',
                status: HttpStatus.CREATED,
                data: newCategory
            });
        }
        catch (error) {
            throw new HttpException(`${error.message}`, HttpStatus.CONFLICT);
        }
    }
    @Get()
    async findAll(@Res() response) {
        try {
            const categories = await this.categoriesService.getAllCategories();
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

            const existing = await this.categoriesService.getCategoryById(id);
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
    async update(
       
        @Param('id') id: number,
        @Body() updateCategoryDto: UpdateCategoryDto,
    ) {
        try {
            const updatecategory = await this.categoriesService.updatecategorie(
                id,
                updateCategoryDto,
            );
            return updatecategory

                 
                
          
        } catch (err) {
            throw new HttpException(`${err.message}`, HttpStatus.NOT_FOUND);
        }
    }
 

    @Delete('/:id')
    async remove(@Res() response, @Param('id') id: number): category {
        try {
            console.log(id);

            const existing = await this.categoriesService.deleteCategoryById(id);
            console.log(existing);

            response.status(HttpStatus.OK).json({
                message: 'delete successfully',

                data: existing,
                status: HttpStatus.OK,
            });
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.NOT_FOUND);


        }
    }

}
