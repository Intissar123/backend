import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Res, UploadedFile, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../../models/user.js';
import { ValidationPipeWithErrors } from 'src/middlewares/validation.pipe';
import { CreateUserDto, UpdateUserDto } from '../auth/auth.dto';
import { RoleGuard } from 'src/middlewares/role/role.guard';
import { Roles } from 'src/middlewares/role/role.decorator';
import { Role } from 'src/data/interfaces';
import { response } from 'express';
import { Strategy } from 'passport-jwt';
import { AuthGuard } from 'src/auth/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';




@Controller('/api/users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }
    
    @Post()
    @UseGuards(AuthGuard)
    @UsePipes(new ValidationPipeWithErrors())
   
    async create(@Res() response, @Body() createUserDto: CreateUserDto){
        try {
            const newUser = await this.usersService.createUser(createUserDto);
            response.status(HttpStatus.CREATED).json({
                message: 'user has been created successfully',
                status: HttpStatus.CREATED,
                data: newUser
            });
        } catch (error) {
            console.log(error)
            throw new HttpException(
                'Error creating user',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
   
    @Get()
    @UseGuards(AuthGuard, RoleGuard)
    @Roles(Role.ADMIN)
    async findAll(): Promise<User[]> {
        try {
            const users = await this.usersService.getAllUsers();
            return users;
        } catch (error) {
            console.log(error)
            throw new HttpException(
                'Error creating user',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
        
    }
    @Get(':id')
    findOne(@Param('id') id: number): User {
        try {
            return this.usersService.getUserById(id);
        } catch (error) {
            console.log(error)
            throw new HttpException(
                'Error creating user',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
        }
      
    
    
    @Put(':id')
    @UsePipes(new ValidationPipeWithErrors())
    async update(
        @Param('id') id: number,
        @Body() updateUserDto: UpdateUserDto,
    ): Promise<UpdateUserDto | string> {
        return await this.usersService.updateUserById(id, updateUserDto);
    }

    @Delete(':id')
    remove(@Param('id') id: number): User {
        return this.usersService.deleteUserById(id);
    }
    @Get(':email')
    async Email(@Res() response, @Param('email') email: string): User {
        try {
            const user = await this.usersService.findOne(email);
            console.log(user)
            response.status(HttpStatus.OK).json({
                message: 'find email  successfully',
                status: HttpStatus.OK,
                data: user
            });

        } catch (error) {
            response.status(HttpStatus.BAD_REQUEST).send("saving " + JSON.stringify(error));
        }
    }
  

}

    
    



