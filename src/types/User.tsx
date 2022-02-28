import { IImage } from './Image';

export interface IUser {
  playcount: number;
  image: IImage[];
  registered: {
    unixtime: number;
  };
}
