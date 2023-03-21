import { FileService } from './file.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import path, { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      //если храним статику внутри папки dist, после билда сбрасывается
      // rootPath: join(__dirname, 'static'),
      // serveRoot: '/static',
      //--------------------------------------------------------------------------------//
      //если решили хранить статику на одном уровне с модулями. Статика больше не пропадет
      rootPath: `${path}/../static`,
    }),
  ],
  controllers: [],
  providers: [FileService],
})
export class FileModule {}
