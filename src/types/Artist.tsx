import { IImage } from './Image';

export interface IArtist {
  '#text': string;
  image: IImage[];
  name: string;
  mbid: string;
  url: string;
  playcount: number;
}
