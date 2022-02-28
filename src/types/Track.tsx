import { IArtist } from './Artist';
import { IImage } from './Image';

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
  album: Record<string, never>;
}
