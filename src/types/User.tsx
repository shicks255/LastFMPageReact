import { IImage } from './Image';

interface IUser {
  playcount: number;
  image: IImage[];
  registered: {
    unixtime: number;
  };
}

interface IUserResponse {
  user: IUser;
}

export type { IUser, IUserResponse };
