/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId, Types } from 'mongoose';
import { CreateAlbumDto } from 'src/album/dto/create-album.dto';
import { Album, AlbumDocument } from 'src/album/schemas/album.schema';
import { FileService, FileType } from 'src/file/file.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CreateTrackDto } from './dto/create-track.dto';
import { Comment, CommentDocument } from './schemas/comments.schema';
import { Track, TrackDocument } from './schemas/track.schema';

@Injectable()
export class TrackService {
  constructor(
    @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    @InjectModel(Album.name) private albumModel: Model<AlbumDocument>,
    private readonly fileService: FileService,
  ) {}

  async create(dto: CreateTrackDto, picture, audio): Promise<Track> {
    const picturePath = this.fileService.createFile(FileType.IMAGE, picture);
    const audioPath = this.fileService.createFile(FileType.AUDIO, audio);
    const track = await this.trackModel.create({
      ...dto,
      listens: 0,
      picture: picturePath,
      audio: audioPath,
    });
    return track;
  }

  async getAll(count = 10, offset = 0): Promise<Track[]> {
    const tracks = await this.trackModel.find().skip(offset).limit(count);
    return tracks;
  }

  async search(query: string): Promise<Track[]> {
    const tracks = await this.trackModel.find({
      name: { $regex: new RegExp(query, 'i') },
    });
    return tracks;
  }

  async getOne(id: ObjectId): Promise<Track> {
    const track = await this.trackModel
      .findById(id)
      .populate('comments')
      .populate('albums');
    return track;
  }

  async delete(id: ObjectId): Promise<Types.ObjectId> {
    const track = await this.trackModel.findByIdAndDelete(id);
    return track._id;
  }

  async addComment(dto: CreateCommentDto): Promise<Comment> {
    const track = await this.trackModel.findById(dto.trackId);
    const comment = await this.commentModel.create({ ...dto });
    track.comments.push(comment);
    await track.save();
    return comment;
  }

  async listen(id: ObjectId) {
    const track = await this.trackModel.findById(id);
    track.listens += 1;
    track.save();
  }

  async addAlbum(dto: CreateAlbumDto): Promise<Album> {
    const track = await this.trackModel.findById(dto.trackId);
    const album = await this.albumModel.create({ ...dto });
    album.tracks.push(track);
    await album.save();
    track.albums.push(album);
    await track.save();
    return album;
  }

  /**
   * Связь уже сществующего трека с существующим альбомом
   * @param idTrack
   * @param idAlbum
   * @returns Promise<Track>
   */
  async attachAlbum(idTrack: ObjectId, idAlbum: ObjectId): Promise<Track> {
    const track = await this.trackModel.findById(idTrack);
    const album = await this.albumModel.findById(idAlbum);

    if (!track.albums.includes(album.id)) {
      track.albums.push(album);
      await track.save();
    }

    if (!album.tracks.includes(track.id)) {
      album.tracks.push(track);
      await album.save();
    }

    return track;
  }
}
