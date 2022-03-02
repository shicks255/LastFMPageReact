import { IImage } from './Image';

export interface IArtist {
  '@attr'?: {
    rank: number;
  };
  '#text': string;
  image: IImage[];
  name: string;
  mbid: string;
  url: string;
  playcount: number;
}
