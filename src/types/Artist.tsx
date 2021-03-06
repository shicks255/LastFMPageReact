import { Image } from './Image';

export type Artist = {
    '#text': string,
    image: Image[],
    name: string,
    mbid: string,
    url: string,
    playcount: number
}
