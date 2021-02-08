import { Artist } from './Artist';

export type TopArtists = {
    '@attr': {
        'page': number,
        'perPage': number,
        'user': string,
        'total': number,
        'totalPages': number,
    },
    artist: Artist[]
}
