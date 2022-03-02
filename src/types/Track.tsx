import { IArtist } from './Artist';
import { IImage } from './Image';
import { IAlbum } from '@/types/Album';

export interface ITrack {
  date: {
    uts: number;
  };
  artist: IArtist;
  image: IImage[];
  name: string;
  url: string;
  duration: number;
  playcount: number;
  album: IAlbum;
  '@attr'?: {
    nowplaying?: boolean;
    rank?: number;
  };
}
