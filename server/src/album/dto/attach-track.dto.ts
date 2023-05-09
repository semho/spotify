import { ObjectId } from 'mongoose';

export class AttachTrackDto {
  readonly idAlbum: ObjectId;
  readonly idTrack: ObjectId;
}
