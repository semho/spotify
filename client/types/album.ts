import { ITrack } from './track';

export interface IAlbum {
  _id: string;
  name: string;
  author: string;
  picture: string;
  tracks: ITrack[];
}

export interface IAlbumState {
  albums: IAlbum[];
  error: string;
  loading: boolean;
}

export interface IServerAlbum {
  serverAlbum: IAlbum;
}
