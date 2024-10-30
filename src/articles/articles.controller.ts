import { BadRequestException, Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Res, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { Article } from '../../models/article.js'
import { UpdateArticleDto } from './dto/update-article.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
@Controller('articles')
export class ArticlesController {
    constructor(private readonly articleService: ArticlesService) { }
    @Post()
    @UseInterceptors(FileInterceptor('image', {
        storage: diskStorage({
            destination: './upload/articles',
            filename: (req, file, callBack) => {
                const fileName = path.parse(file.originalname).name.replace(/\s/g, '') + Date.now();
                const extension = path.parse(file.originalname).ext;
                callBack(null, `${fileName}${extension}`);
            }
        })
    }))
    async create(@Res() response, @Body() createArticleDto: CreateArticleDto, @UploadedFile() file) {
        try {
            if (!file) {
                throw new Error('File not uploaded');
            }

            console.log("file", file);
            console.log("createArticleDto", createArticleDto);

            createArticleDto.image = file.filename;
            const newArticle = await this.articleService.createArticle(createArticleDto);

            response.status(HttpStatus.CREATED).json({
                message: 'Article has been created successfully',
                status: HttpStatus.CREATED,
                data: newArticle
            });
        } catch (error) {
            console.log(error);
            throw new HttpException(
                `${error.message}`,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
    // uploadFile(@Res() res, @UploadedFile() file) {
    //     return res.status(HttpStatus.OK).json({
    //         success: true,
    //         data: file.path
    //     });
    // }
    @Get()
    async findAll(@Res() response) {
        try {
            const articles = await this.articleService.getAllArticles();
            response.status(HttpStatus.OK).json({
                message: 'all article data successfully',
                status: HttpStatus.OK,
                data: articles
            });

        } catch (error) {
            throw new HttpException(
                `${error.message}`,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }

    }
    @Get('/:id')
    async getArticle(@Res() response, @Param('id') id: number) {
        try {
            console.log(id);

            const existing = await this.articleService.getArticleById(id);
            console.log(existing);

            return response.status(HttpStatus.OK).json({
                message: 'Article found  successfully',

                data: existing,
                status: HttpStatus.OK,
            });
        } catch (err) {
            throw new HttpException(`${err.message}`, HttpStatus.NOT_FOUND);


        }
    }

    @Get('/slug/:slug')
    async findOneBySlug(@Param('slug') slug: string) {
        try {
            return this.articleService.getProductBySlug(slug);
        } catch (error) {
            console.log(error)
            throw new HttpException(`${error.message}`, HttpStatus.NOT_FOUND);
        }
    }
    @Put('/:id')
    @UseInterceptors(FileInterceptor('image', {
        storage: diskStorage({
            destination: './upload/articles',
            filename: (req, file, callBack) => {
                const fileName = path.parse(file.originalname).name.replace(/\s/g, '') + Date.now()
                const extension = path.parse(file.originalname).ext;
                callBack(null, `${fileName}${extension}`)
            }
        })
    }))
    async updateArticle(@Res() response, @Param('id') id: number, @Body() updateArticleDto: UpdateArticleDto, @UploadedFile() file) {
        try {
            if (file == undefined || file.length == 0) {
                updateArticleDto.image = (await this.articleService.getArticleById(id)).image;
                console.log(id);

                const existing = await this.articleService.updatearticle(id, updateArticleDto);
                console.log(existing);
                return response.status(HttpStatus.OK).json({
                    message: 'article has been  successfully update',
                    data: existing,
                    status: HttpStatus.OK

                });
            }
            else {
                updateArticleDto.image = file.filename;
                const existing = await this.articleService.updatearticle(id, updateArticleDto);
                console.log(existing);
                return response.status(HttpStatus.OK).json({
                    message: 'article has been  successfully update',
                    data: existing,
                    status: HttpStatus.OK

                });
            }
            } catch (err) {
                console.log(err);

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
        async remove(@Res() response, @Param('id') id: number): Article {
            try {
                console.log(id);

                const existing = await this.articleService.deleteArticleById(id);
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

