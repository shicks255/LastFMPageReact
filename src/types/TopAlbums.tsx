import { IAlbum } from './Album';

interface ITopAlbums {
  '@attr': {
    page: number;
    perPage: number;
    user: string;
    total: number;
    totalPages: number;
  };
  album: IAlbum[];
}

interface ITopAlbumsResponse {
  topalbums: ITopAlbums;
}

export type { ITopAlbums, ITopAlbumsResponse };
