import { QueryObserverResult, useQuery } from 'react-query';
import { useContext } from 'react';
import { LocalStateContext } from '../contexts/LocalStateContext';
import { getActualArtistUrl } from '../utils';
import { RecentTracks } from '../types/RecentTracks';
import { TopAlbums } from '../types/TopAlbums';
import { TopTracks } from '../types/TopTracks';
import { TopArtists } from '../types/TopArtists';
import { User } from '../types/User';

const apiKey = process.env.REACT_APP_LAST_FM_KEY;

function generateUrl(type, page, period, key, userName) {
  return `https://ws.audioscrobbler.com/2.0/?method=${type}
        &user=${userName}
        &api_key=${key}
        &format=json
        &period=${period}
        &page=${page}`;
}

const queryOptions = {
  refetchOnWindowFocus: false,
  staleTime: (1000 * 60 * 10),
  retry: false,
};

const userQuery = async (userName) => {
  const url = (`https://ws.audioscrobbler.com/2.0/?method=user.getinfo
        &user=${userName}
        &api_key=${apiKey}
        &format=json`);
  return fetch(url)
    .then((res) => Promise.all([res.ok, res.json()]))
    .then(([ok, body]) => {
      if (!ok) {
        localStorage.setItem('userName', 'shicks255');
        throw new Error(JSON.stringify({
          technical: body.message,
          business: 'Problem loading recent tracks',
        }));
      }
      localStorage.setItem('userName', userName);
      return body.user;
    });
};

function useUserQuery(userName: string): QueryObserverResult<User, Error> {
  return useQuery(['user', userName], async () => userQuery(userName), queryOptions);
}

function checkUserName(userName: string): Promise<boolean> {
  const url = (`https://ws.audioscrobbler.com/2.0/?method=user.getinfo
        &user=${userName}
        &api_key=${apiKey}
        &format=json`);
  return fetch(url)
    .then((res) => res.ok)
    .then((ok) => ok);
}

const recentTracksQuery = (page, userName) => {
  const url = generateUrl('user.getrecenttracks', page, '', apiKey, userName);
  return fetch(url)
    .then((res) => Promise.all([res.ok, res.json()]))
    .then(([ok, body]) => {
      if (!ok) {
        throw new Error(JSON.stringify({
          technical: body.message,
          business: 'Problem loading recent tracks',
        }));
      }
      return body.recenttracks;
    });
};

function useRecentTracks(page: number): QueryObserverResult<RecentTracks, Error> {
  const { state } = useContext(LocalStateContext);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return useQuery(['recentTracks', state.userName, page],
    () => recentTracksQuery(page, state.userName),
    {
      refetchInterval: 30000,
      refetchOnWindowFocus: false,
      retry: false,
    });
}

const recentTracksBigQuery = async (userName) => {
  const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks
        &user=${userName}
        &api_key=${apiKey}
        &format=json
        &limit=200
        &page=1`;
  return fetch(url)
    .then((res) => Promise.all([res.ok, res.json()]))
    .then(([ok, body]) => {
      if (!ok) {
        throw Error(JSON.stringify({
          technical: body.message,
          business: 'Problem loading recent tracks',
        }));
      }
      return body.recenttracks;
    });
};

function useRecentTracksBig(): QueryObserverResult<RecentTracks, Error> {
  const { state } = useContext(LocalStateContext);
  return useQuery(['recentTracks', 'big', state.userName], async () => recentTracksBigQuery(state.userName), queryOptions);
}

const topAlbumsQuery = async (timeFrame, page, userName) => {
  const url = generateUrl('user.getTopAlbums', page, timeFrame, apiKey, userName);
  return fetch(url)
    .then((res) => Promise.all([res.ok, res.json()]))
    .then(([ok, body]) => {
      if (!ok) {
        throw Error(JSON.stringify({
          business: 'Problem loading top albums',
          technical: body.message,
        }));
      }
      return body.topalbums;
    });
};

function useTopAlbums(timeFrame: string, page: number): QueryObserverResult<TopAlbums, Error> {
  const { state } = useContext(LocalStateContext);
  return useQuery(['topAlbums', state.userName, timeFrame, page], async () => topAlbumsQuery(timeFrame, page, state.userName), queryOptions);
}

const topTracksQuery = async (timeFrame, page, userName) => {
  const url = generateUrl('user.getTopTracks', page, timeFrame, apiKey, userName);
  return fetch(url)
    .then((res) => Promise.all([res.ok, res.json()]))
    .then(([ok, body]) => {
      if (!ok) {
        throw Error(JSON.stringify({
          technical: body.message,
          business: 'Problem loading top tracks',
        }));
      }
      return body.toptracks;
    });
};

function useTopTracks(timeFrame: string, page: number): QueryObserverResult<TopTracks, Error> {
  const { state } = useContext(LocalStateContext);
  return useQuery(['topTracks', state.userName, timeFrame, page], async () => topTracksQuery(timeFrame, page, state.userName), queryOptions);
}

const useArtistImage: (string, number) => QueryObserverResult<string, Error> = (mbid: string, artistName: string) => useQuery(['artistImage', mbid, artistName], async () => getActualArtistUrl(mbid, artistName), queryOptions);

const topArtistsQuery = async (timeFrame, page, userName) => {
  const url = generateUrl('user.getTopArtists', page, timeFrame, apiKey, userName);
  return fetch(url)
    .then((res) => Promise.all([res.ok, res.json()]))
    .then(([ok, body]) => {
      if (!ok) {
        throw Error(JSON.stringify({
          technical: body.message,
          business: 'Problem loading top artists',
        }));
      }
      return body.topartists;
    });
};

function useTopArtists(timeFrame: string, page: number): QueryObserverResult<TopArtists, Error> {
  const { state } = useContext(LocalStateContext);
  return useQuery(['topArtists', state.userName, timeFrame, page], async () => topArtistsQuery(timeFrame, page, state.userName), queryOptions);
}

export {
  useUserQuery,
  useRecentTracks,
  useRecentTracksBig,
  useTopArtists,
  useTopAlbums,
  useTopTracks,
  useArtistImage,
  checkUserName,
  recentTracksQuery,
};
