import { TrackController } from './track.controller';
import { TrackService } from './track.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Track, TrackSchema } from './schemas/track.schema';
import { Comment, CommentSchema } from './schemas/comments.schema';
import { FileService } from 'src/file/file.service';
import { Album, AlbumSchema } from 'src/album/schemas/album.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Track.name, schema: TrackSchema }]),
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
    MongooseModule.forFeature([{ name: Album.name, schema: AlbumSchema }]),
  ],
  controllers: [TrackController],
  providers: [TrackService, FileService],
})
export class TrackModule {}
