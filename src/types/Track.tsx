import { Artist } from './Artist';

export type Track = {
    date: {
        uts: number
    },
    artist: Artist,
    album: Record<string, never>
}
