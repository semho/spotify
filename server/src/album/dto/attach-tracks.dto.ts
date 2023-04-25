import { ObjectId } from 'mongoose';

export class AttachTracksDto {
  readonly idAlbum: ObjectId;
  readonly idTracks: ObjectId[];
}
