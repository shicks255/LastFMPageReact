import { IImage } from './Image';

interface IUser {
  playcount: number;
  artist_count: number;
  track_count: number;
  album_count;
  image: IImage[];
  url: string;
  registered: {
    unixtime: number;
  };
}

interface IUserResponse {
  user: IUser;
}

export type { IUser, IUserResponse };
