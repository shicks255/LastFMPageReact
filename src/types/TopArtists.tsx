import { IArtist } from './Artist';

interface ITopArtists {
  '@attr': {
    page: number;
    perPage: number;
    user: string;
    total: number;
    totalPages: number;
  };
  artist: IArtist[];
}

interface ITopArtistsResponse {
  topartists: ITopArtists;
}

export type { ITopArtists, ITopArtistsResponse };
