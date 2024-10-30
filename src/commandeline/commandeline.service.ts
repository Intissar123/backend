// import { Injectable, NotFoundException } from '@nestjs/common';
// import { Commandeline } from './commandeline.interface';
// import { CreateCommandelineDto } from './dto/create-commandeline.dto';
// import { UpdateCommandelineDto } from './dto/update-commandeline.dto';
// const db = require('../../models');

// @Injectable()
// export class CommandelineService {
//     async createCommandeline(createCommandelineDto: CreateCommandelineDto) {
//         try {
//            // console.log(createCommandelineDto);

//             const articleExiting = await db.article.findByPk(createCommandelineDto.articleId)
//            // console.log(articleExiting);
//             const commandeExiting = await db.commande.findByPk(createCommandelineDto.commandeId)
//             //console.log("+++++++++++++++");
//             //console.log(await db.commandeline.create(createCommandelineDto));
//             //console.log(db.commandeline);
//             if (!commandeExiting) {
//                 console.log(commandeExiting);
//                 return `commandeId ${createCommandelineDto.commandeId} not found!`;
//             } else if (!articleExiting) {
//                 console.log(articleExiting);
//                 return `articleId ${createCommandelineDto.articleId} not found!`;
//             }
//             else {
               
                
//                 return await db.commandeline.create(createCommandelineDto)
//             }


//         } catch (error) {
//             throw new Error(`failed  to create commandeline ${error.message}`);
//         }
//     }
//     async getAllCommandelines(): Promise<Commandeline[]> {
//         const commandeline = await db.commandeline.findAll();
//         // console.log(commandeline);
//         if (!commandeline || commandeline.length == 0)
//         //console.log(commandeline);
//         {
//             throw new NotFoundException('commandeline data not found!');

//         }
//         return commandeline;
//     }
//     async getCommandelineById(id: number): Promise<Commandeline> {
//         const commandeline = await db.commandeline.findByPk(id);
//         if (!commandeline) {
//             throw new NotFoundException(`commandeline#${id} not found`);
//         }
//         return commandeline;
//     }
//     async updatecommandeline(id: number, data: UpdateCommandelineDto,): Promise<UpdateCommandelineDto | string> {
//         try {
//             const articleExist = await db.article.findByPk(data.articleId)
//             const commandeExist = await db.commande.findByPk(data.commandeId)
//             const existing = await db.commandeline.findByPk(id);
//             console.log(existing);
            
//             if (!existing) { return ` commandeline not found!` }
//             else if (!articleExist && !commandeExist) { return ` article not found!,commande not found!` }
//             else if (data.articleId == null || articleExist && data.commandeId == null || commandeExist) {
//                 await db.commandeline.update(data, { where: { id: id } })
//                 return `commandeline with ID ${id} updated successfully:${JSON.stringify(data)}`;
//             }
//         }
//         catch (error) { throw new NotFoundException(`#${data.articleId}  articleId  not found!,#${data.commandeId}  commandeId  not found!`); }
//     }


//     async deleteCommandelineById(id: number): Promise<string> {
//         const commandeline = await this.getCommandelineById(id);
//         if (!commandeline) {
//             throw new NotFoundException(`Article #${id} not found`);
//         } else {
//             await db.commandeline.destroy({ where: { id: id } });
//             return `commandeline with ID ${id} deleted successfully.`;
//         }
//     }
// }
