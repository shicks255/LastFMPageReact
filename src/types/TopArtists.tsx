import { IArtist } from './Artist';

export interface ITopArtists {
  '@attr': {
    page: number;
    perPage: number;
    user: string;
    total: number;
    totalPages: number;
  };
  artist: IArtist[];
}
