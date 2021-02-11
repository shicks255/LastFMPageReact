import { Image } from './Image';

export type User = {
    playcount: number,
    image: Image[],
    registered: {
        unixtime: number,
    }
}
