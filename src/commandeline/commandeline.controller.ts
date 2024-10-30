// import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
// import { CommandelineService } from './commandeline.service';
// import { CreateCommandelineDto } from './dto/create-commandeline.dto';
// import { CommandeLine } from '../../models/commandeline.js'
// import { UpdateCommandelineDto } from './dto/update-commandeline.dto';

// @Controller('commandelines')
// export class CommandelineController {
//     constructor(private readonly commandelineService: CommandelineService) { }

//     @Post()
//     async create(@Res() response, @Body() createCommandelineDto: CreateCommandelineDto) {
//         try {
//             console.log(createCommandelineDto);
            
//             const newCommandeline = await this.commandelineService.createCommandeline(createCommandelineDto);
//             console.log(newCommandeline);
            
//             response.status(HttpStatus.CREATED).json({
//                 message: 'Commandeline has been created successfully',
//                 status: HttpStatus.CREATED,
//                 data: newCommandeline
//             });
//         }
//         catch (error) {
//             console.log(error);
//             response.status(HttpStatus.BAD_REQUEST).send("saving " + JSON.stringify(error));
//         }
//     }
//     @Get()
//     async findAll(@Res() response) {
//         try {
           
//             const Commandeline = await this.commandelineService.getAllCommandelines();
//             console.log(Commandeline);
            
//             response.status(HttpStatus.OK).json({
//                 message: 'all Commandeline data successfully',
//                 status: HttpStatus.OK,
//                 data: Commandeline
//             });

//         } catch (error) {
//             response.status(HttpStatus.BAD_REQUEST).send("saving " + JSON.stringify(error));
//         }

//     }
//     @Get('/:id')
//     async getCommandeline(@Res() response, @Param('id') id: number) {
//         try {
//             console.log(id);

//             const existing = await this.commandelineService.getCommandelineById(id);
//             console.log(existing);

//             return response.status(HttpStatus.OK).json({
//                 message: 'commandeline found  successfully',

//                 data: existing,
//                 status: HttpStatus.OK,
//             });
//         } catch (err) {
//             response.status(HttpStatus.BAD_REQUEST).send("saving " + JSON.stringify(err));


//         }
//     }
//     @Put('/:id')
//     async updateCommandeline(@Res() response, @Param('id') id: number, @Body() updateCommandelineDto: UpdateCommandelineDto) {
//         try {
//             console.log(id);

//             const existing = await this.commandelineService.updatecommandeline(id, updateCommandelineDto);
//             console.log(existing);
//             return response.status(HttpStatus.OK).json({
//                 message: 'Commandeline has been  successfully update',
//                 data: existing,
//                 status: HttpStatus.OK

//             });
//         } catch (err) {
//             console.log(err);
            
            
//             response.status(HttpStatus.BAD_REQUEST).send("saving " + JSON.stringify(err));


//         }
//     }


//     @Delete('/:id')
//     async remove(@Res() response, @Param('id') id: number): CommandeLine {
//         try {
//             console.log(id);

//             const existing = await this.commandelineService.deleteCommandelineById(id);
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
