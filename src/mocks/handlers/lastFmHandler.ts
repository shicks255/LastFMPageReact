import { rest } from 'msw';

import { DARK_SIDE_MOON, MONEY, PINK_FLOYD } from '@/mocks/constants';
import { audioscrobblerApi } from '@/service/api';
import { IRecentTracks } from '@/types/RecentTracks';
import { ITopAlbums, ITopAlbumsResponse } from '@/types/TopAlbums';
import { ITopArtists } from '@/types/TopArtists';
import { ITopTracks } from '@/types/TopTracks';
import { IUser } from '@/types/User';

const getUser = (s: URLSearchParams) => {
  const user: IUser = {
    image: [{ '#text': 'testest' }],
    playcount: 500,
    registered: {
      unixtime: 123123
    }
  };

  return user;
};

const getRecentTracks = (s: URLSearchParams) => {
  const recentTracks: IRecentTracks = {
    track: [MONEY],
    '@attr': {
      page: 1,
      perPage: 1,
      user: '',
      total: 1,
      totalPages: 1
    }
  };

  return { recenttracks: recentTracks };
};

function getTopAlbums(s: URLSearchParams): ITopAlbumsResponse {
  const topAlbums: ITopAlbums = {
    album: [DARK_SIDE_MOON],
    '@attr': {
      page: 1,
      perPage: 1,
      user: '',
      total: 1,
      totalPages: 1
    }
  };

  return { topalbums: topAlbums };
}

const getTopTracks = (s: URLSearchParams) => {
  const topTracks: ITopTracks = {
    track: [MONEY],
    '@attr': {
      page: 1,
      perPage: 1,
      user: '',
      total: 1,
      totalPages: 1
    }
  };

  return { toptracks: topTracks };
};

const getTopArtists = (s: URLSearchParams) => {
  const topArtists: ITopArtists = {
    artist: [PINK_FLOYD],
    '@attr': {
      page: 1,
      perPage: 1,
      user: '',
      total: 1,
      totalPages: 1
    }
  };

  return { topartists: topArtists };
};

const lastFm = rest.get(`${audioscrobblerApi}`, (req, res, ctx) => {
  const s = req.url.searchParams;

  const method = s.get('method')?.trim();

  if (method === 'user.getuser') return res(ctx.json(getUser(s)));
  if (method === 'user.getrecenttracks') return res(ctx.json(getRecentTracks(s)));
  if (method === 'user.getTopAlbums') return res(ctx.json(getTopAlbums(s)));
  if (method === 'user.getTopArtists') return res(ctx.json(getTopArtists(s)));
  if (method === 'user.getTopTracks') return res(ctx.json(getTopTracks(s)));

  return res(ctx.json('blah'));
});

// const lastFmHandlers = [getRecentTracks, getTopTracks, getTopAlbums, getTopArtists, getUser];
const lastFmHandlers = [lastFm];
export default lastFmHandlers;
