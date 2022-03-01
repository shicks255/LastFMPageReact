import { IArtist } from './Artist';
import { IImage } from './Image';

export interface IAlbum {
  '@attr': {
    rank: number;
  };
  artist: IArtist;
  image: IImage[];
  name: string;
  playcount: number;
  url: string;
}
