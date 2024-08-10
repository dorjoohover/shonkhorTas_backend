import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  StreamableFile,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiParam } from '@nestjs/swagger';
import * as path from 'path';
import { createReadStream } from 'fs';
import { memoryStorage } from 'multer';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly service: AppService) {}
  
  @Post('upload')
  @UseInterceptors(FilesInterceptor('files', 8, { storage: memoryStorage() }))
  async multiFileUpload(@UploadedFiles() file: Array<Express.Multer.File>) {
    const processImage = await this.service.processMultipleImages(file);

    return { file: processImage };
  }

  @Get('/file/:file')
  @ApiParam({ name: 'file' })
  getFile(@Param('file') filename: string): StreamableFile {
    const file = createReadStream(path.join('./uploads/' + filename));
    return new StreamableFile(file);
  }
}
