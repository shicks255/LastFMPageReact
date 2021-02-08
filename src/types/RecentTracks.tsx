import { Track } from './Track';

export type RecentTracks = {
    '@attr': {
        'page': number,
        'perPage': number,
        'user': string,
        'total': number,
        'totalPages': number,
    }
    'track': Track[],
}
