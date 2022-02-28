import { ITrack } from './Track';

export interface ITopTracks {
  '@attr': {
    page: number;
    perPage: number;
    user: string;
    total: number;
    totalPages: number;
  };
  track: ITrack[];
}
