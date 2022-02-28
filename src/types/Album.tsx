import { IArtist } from './Artist';
import { IImage } from './Image';

export interface IAlbum {
  image: IImage[];
  name: string;
  url: string;
  artist: IArtist;
  playcount: number;
}
