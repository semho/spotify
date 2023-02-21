import { TrackModule } from './track/track.module';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://admin:admin@cluster0.dfnvqnv.mongodb.net/spotify?retryWrites=true&w=majority',
    ),
    TrackModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
