import { IAlbum } from './Album';

export interface ITopAlbums {
  '@attr': {
    page: number;
    perPage: number;
    user: string;
    total: number;
    totalPages: number;
  };
  album: IAlbum[];
}
