import { rest } from 'msw';

import { audioscrobblerApi, musicApi } from '@/service/api';
import { IRecentTracks } from '@/types/RecentTracks';

const getScrobbles = rest.get(
  `${musicApi}/scrobbles?userName=shicks255&period=test&page=1`,
  (req, res, ctx) => {
    const scrobbles: IRecentTracks = {
      track: [],
      '@attr': {
        page: 1,
        perPage: 1,
        user: '',
        total: 1,
        totalPages: 1
      }
    };

    return res(ctx.json(scrobbles));
  }
);

// const getScrobblesGrouped = rest.get(
//   `${musicApi}/scrobbles/grouped?userName=shicks255&period=test&page=1`,
//   (req, res, ctx) => {
//     const scrobbles: IRecentTracks = {
//       track: [],
//       '@attr': {
//         page: 1,
//         perPage: 1,
//         user: '',
//         total: 1,
//         totalPages: 1
//       }
//     };
//
//     return res(ctx.json(scrobbles));
//   }
// );
//
// const getScrobblesGroupedAlbum = rest.get(
//   `${musicApi}/scrobbles/groupedAlbum?userName=shicks255&period=test&page=1`,
//   (req, res, ctx) => {
//     const scrobbles: IRecentTracks = {
//       track: [],
//       '@attr': {
//         page: 1,
//         perPage: 1,
//         user: '',
//         total: 1,
//         totalPages: 1
//       }
//     };
//
//     return res(ctx.json(scrobbles));
//   }
// );
//
// const getScrobblesGroupedArtist = rest.get(
//   `${musicApi}/scrobbles/groupedArtist?userName=shicks255&period=test&page=1`,
//   (req, res, ctx) => {
//     const scrobbles: IRecentTracks = {
//       track: [],
//       '@attr': {
//         page: 1,
//         perPage: 1,
//         user: '',
//         total: 1,
//         totalPages: 1
//       }
//     };
//
//     return res(ctx.json(scrobbles));
//   }
// );
//
const musicApiHandlers = [
  getScrobbles
  //   getScrobblesGrouped,
  //   getScrobblesGroupedAlbum,
  //   getScrobblesGroupedArtist
];
export default musicApiHandlers;
