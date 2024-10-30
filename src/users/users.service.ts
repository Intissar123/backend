import { Injectable, NotFoundException, Param } from '@nestjs/common';
import { User } from './users.interface';
import { UpdateUserDto } from 'src/auth/auth.dto';
const db = require('../../models')

@Injectable()
export class UsersService {
 
    async createUser(data: any): Promise<User>
    {
        try {
            const user = await db.user.create(data);
           
            console.log(db);
            return user;
            
        } catch (error) {
            throw new Error(`failed  to create user ${error.message}`);
        }
        

    }
    async getAllUsers(): Promise<User[]> {
     
            const user = await db.user.findAll();
            if (!user || user.length == 0) {
                throw new NotFoundException('user data not found!');
            }
            return user;
       
        }
        
    async getUserById(id: number): Promise<User> {
        try {
            const user = await db.user.findByPk(id);
            if (!user) {
                return null;
            }
            return user;
        } catch (error) {
            throw new Error(`failed to get the user ${error.message}`);
        }
    }
    async updateUserById(id: number, data: UpdateUserDto): Promise<UpdateUserDto | string> {
        try {
            const user = await this.getUserById(id);
            if (user) {
                // User exists, proceed with update
                await db.user.update(data, { where: { id: id } });
                return data;
            } else {
                // User does not exist
                return `User with ID ${id} not found.`;
            }
        } catch (error) {
            console.log(error);
            throw new Error(`Failed to update the user: ${error.message}`);
        }
    }

   


    async deleteUserById(id: number): Promise<User | 'user not found'> {
        try {
            const user = await this.getUserById(id);
            if (!user) {
                await db.user.destroy({ where: { id: id } });
                return user;
            } else {
                return 'user not found';
            }
        } catch (error) {
            throw new NotFoundException(`User with ID ${id} not found.`);
        }
    }



    async findOne(email: string): Promise<User | null> {
        try {
            const user = await db.user.findOne({ where: { email: email } });
            return user;
        } catch (error) {
            throw new Error(`failed to find user ${error.message}`);
        }
    }

}
