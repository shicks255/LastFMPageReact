import { Artist } from './Artist';
import { Image } from './Image';

export type Track = {
    date: {
        uts: number
    },
    artist: Artist,
    image: Image[],
    name: string,
    url: string,
    duration: number,
    playcount: number,
    album: Record<string, never>
}
