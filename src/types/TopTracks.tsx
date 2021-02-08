import { Track } from './Track';

export type TopTracks = {
    '@attr': {
        'page': number,
        'perPage': number,
        'user': string,
        'total': number,
        'totalPages': number,
    },
    track: Track[]
}
