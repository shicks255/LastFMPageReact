import { ITrack } from './Track';

interface ITopTracks {
  '@attr': {
    page: number;
    perPage: number;
    user: string;
    total: number;
    totalPages: number;
  };
  track: ITrack[];
}

interface ITopTracksResponse {
  toptracks: ITopTracks;
}

export type { ITopTracks, ITopTracksResponse };
