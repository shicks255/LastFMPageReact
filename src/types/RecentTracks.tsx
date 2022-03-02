import { ITrack } from './Track';

interface IRecentTracks {
  '@attr': {
    page: number;
    perPage: number;
    user: string;
    total: number;
    totalPages: number;
  };
  track: ITrack[];
}

interface IRecentTracksResponse {
  recenttracks: IRecentTracks;
}

export type { IRecentTracksResponse, IRecentTracks };
