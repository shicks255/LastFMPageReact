import { Album } from './Album';

export type TopAlbums = {
    '@attr': {
        'page': number,
        'perPage': number,
        'user': string,
        'total': number,
        'totalPages': number,
    },
    album: Album[],
}
