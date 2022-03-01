import { rest } from 'msw';

import { audioscrobblerApi, topTracksQuery } from '@/service/api';
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
    track: [],
    '@attr': {
      page: 1,
      perPage: 1,
      user: '',
      total: 1,
      totalPages: 1
    }
  };

  return recentTracks;
};

function getTopAlbums(s: URLSearchParams): ITopAlbumsResponse {
  const topAlbums: ITopAlbums = {
    album: [
      {
        '@attr': {
          rank: 1
        },
        image: [],
        artist: {
          url: '',
          image: [],
          playcount: 100,
          mbid: '123',
          '#text': 'Glen Campbell',
          name: 'Glenn Campbell'
        },
        name: 'Greatest Hits',
        url: '',
        playcount: 100
      }
    ],
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
    track: [],
    '@attr': {
      page: 1,
      perPage: 1,
      user: '',
      total: 1,
      totalPages: 1
    }
  };

  return topTracks;
};

const getTopArtists = (s: URLSearchParams) => {
  const topArtists: ITopArtists = {
    artist: [],
    '@attr': {
      page: 1,
      perPage: 1,
      user: '',
      total: 1,
      totalPages: 1
    }
  };

  return topArtists;
};

const lastFm = rest.get(`${audioscrobblerApi}`, (req, res, ctx) => {
  const s = req.url.searchParams;

  const user = s.get('user');
  const method = s.get('method')?.trim();
  console.log(method);

  if (method === 'user.getuser') return res(ctx.json(getUser(s)));
  if (method === 'user.getTopAlbums') return res(ctx.json(getTopAlbums(s)));
  if (method === 'user.getTopArtists') return res(ctx.json(getTopArtists(s)));
  if (method === 'user.getTopTracks') return res(ctx.json(getTopTracks(s)));

  return res(ctx.json('blah'));
});

// const lastFmHandlers = [getRecentTracks, getTopTracks, getTopAlbums, getTopArtists, getUser];
const lastFmHandlers = [lastFm];
export default lastFmHandlers;
