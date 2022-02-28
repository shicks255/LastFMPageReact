import { ITrack } from './Track';

export interface IRecentTracks {
  '@attr': {
    page: number;
    perPage: number;
    user: string;
    total: number;
    totalPages: number;
  };
  track: ITrack[];
}
