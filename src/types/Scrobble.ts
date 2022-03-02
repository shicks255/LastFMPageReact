interface IScrobble {
  id: 0;
  userName: 'string';
  name: 'string';
  artistMbid: 'string';
  artistName: 'string';
  albumMbid: 'string';
  albumName: 'string';
  time: 0;
}

interface IScrobblesGrouped {
  data: IArtistScrobbleData[];
}

interface IArtistScrobbleData {
  artistName: string;
  albumName?: string;
  data: IScrobbleData[];
  total: number;
}

// interface AlbumScrobbleData {
//     albumName: string;
//     data: ScrobbleData[];
//     total: number;
// }

interface IScrobbleData {
  plays: number;
  timeGroup: string;
}

export type { IScrobblesGrouped, IArtistScrobbleData, IScrobbleData, IScrobble };
