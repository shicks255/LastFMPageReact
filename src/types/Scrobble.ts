export interface Scrobble {
    id: 0,
    userName: 'string',
    name: 'string',
    artistMbid: 'string',
    artistName: 'string',
    albumMbid: 'string',
    albumName: 'string',
    time: 0
}

interface ScrobblesGrouped {
    data: ArtistScrobbleData[]
}

interface ArtistScrobbleData {
    artistName: string;
    albumName?: string;
    data: ScrobbleData[];
    total: number;
}

// interface AlbumScrobbleData {
//     albumName: string;
//     data: ScrobbleData[];
//     total: number;
// }

interface ScrobbleData {
    plays: number;
    timeGroup: string;
}

export type {
  ScrobblesGrouped, ArtistScrobbleData, ScrobbleData,
};
