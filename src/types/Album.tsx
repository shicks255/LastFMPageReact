import { Image } from './Image';
import { Artist } from './Artist';

export type Album = {
    image: Image[],
    name: string,
    url: string,
    artist: Artist,
    playcount: number,
}
