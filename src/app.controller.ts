import { Controller, Get, Param, Res, StreamableFile } from '@nestjs/common';
import { AppService } from './app.service';
import { createReadStream } from 'fs';
import { join } from 'path';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get("file/:folder/:img")
  async getFile(@Res() res, @Param('img') img, @Param('folder') folder) {
    const filePath = join(process.cwd(), './upload/' + folder + '/' + img);
    const fileStream = createReadStream(filePath);
    res.setHeader('Content-Type', 'image/jpeg');
    res.setHeader('Content-Disposition', `inline; filename="${img}"`);
    fileStream.pipe(res);
  }

}
