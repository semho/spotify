import { FileModule } from './file/file.module';
import { TrackModule } from './track/track.module';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
    FileModule,
    MongooseModule.forRoot(
      'mongodb+srv://admin:admin@cluster0.dfnvqnv.mongodb.net/spotify?retryWrites=true&w=majority',
    ),
    TrackModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
