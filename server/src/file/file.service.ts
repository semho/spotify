/*
https://docs.nestjs.com/providers#services
*/

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import { randomUUID } from 'crypto';

export enum FileType {
  AUDIO = 'audio',
  IMAGE = 'image',
}

@Injectable()
export class FileService {
  createFile(
    type: FileType,
    file: { originalname?: string; buffer?: string },
  ): string {
    try {
      const fileExtension = file.originalname.split('.').pop();
      const fileName = randomUUID() + '.' + fileExtension;

      //путь для хранения внутри папки dist
      //const filePath = path.resolve(__dirname, '..', 'static', type);
      //путь для хранения на одном уровне с dist
      const filePath = path.resolve(__dirname, '../..', 'static', type);

      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(path.resolve(filePath, fileName), file.buffer);

      return type + '/' + fileName;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  removeFile(fileName: string) {}
}
