/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId, Types } from 'mongoose';
import { FileService, FileType } from 'src/file/file.service';
import { CreateTrackDto } from 'src/track/dto/create-track.dto';
import { Track, TrackDocument } from 'src/track/schemas/track.schema';
import { CreateAlbumDto } from './dto/create-album.dto';
import { Album, AlbumDocument } from './schemas/album.schema';

@Injectable()
export class AlbumService {
  constructor(
    @InjectModel(Album.name) private albumModel: Model<AlbumDocument>,
    @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
    private readonly fileService: FileService,
  ) {}

  async create(dto: CreateAlbumDto, picture): Promise<Album> {
    const picturePath = this.fileService.createFile(FileType.IMAGE, picture);
    const album = await this.albumModel.create({
      ...dto,
      picture: picturePath,
    });
    return album;
  }

  async getAll(count = 10, offset = 0): Promise<Album[]> {
    const albums = await this.albumModel.find().skip(offset).limit(count);
    return albums;
  }

  async search(query: string): Promise<Album[]> {
    const album = await this.albumModel.find({
      name: { $regex: new RegExp(query, 'i') },
    });
    return album;
  }

  async getOne(id: ObjectId): Promise<Album> {
    const track = await this.albumModel.findById(id).populate('tracks');
    return track;
  }

  async delete(id: ObjectId): Promise<Types.ObjectId> {
    const track = await this.albumModel.findByIdAndDelete(id);
    return track._id;
  }

  async addTrack(dto: CreateTrackDto): Promise<Track> {
    const album = await this.albumModel.findById(dto.albumId);
    const track = await this.trackModel.create({ ...dto });
    track.albums.push(album);
    await track.save();
    album.tracks.push(track);
    await album.save();
    return track;
  }

  /**
   * Связь уже сществующего альбомом с существующими треками
   * @param idTracks
   * @param idAlbum
   * @returns Promise<Album>
   */
  async attachAlbum(idAlbum: ObjectId, idTracks: ObjectId[]): Promise<Album> {
    const album = await this.albumModel.findById(idAlbum);

    await Promise.all(
      idTracks.map(async (idTrack) => {
        const track = await this.trackModel.findById(idTrack);
        if (!album.tracks.includes(track.id)) {
          album.tracks.push(track);
        }

        if (!track.albums.includes(album.id)) {
          track.albums.push(album);
        }
      }),
    );

    await album.save();

    await Promise.all(
      idTracks.map(async (idTrack) => {
        const track = await this.trackModel.findById(idTrack);
        await track.save();
      }),
    );

    return album;
  }
}
