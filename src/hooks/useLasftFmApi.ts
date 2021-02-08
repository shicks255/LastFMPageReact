import { QueryObserverResult, useQuery } from 'react-query';
import { useContext } from 'react';
import { LocalStateContext } from '../LocalStateContext';
import { getActualArtistUrl } from '../utils';
import { RecentTracks } from '../types/RecentTracks';
import { TopArtists } from '../types/TopArtists';
import { TopAlbums } from '../types/TopAlbums';
import { TopTracks } from '../types/TopTracks';

export default function useLastFmApi() {
  const { state, actions } = useContext(LocalStateContext);
  const apiKey = process.env.REACT_APP_LAST_FM_KEY;

  const queryOptions = {
    refetchOnWindowFocus: false,
    staleTime: (1000 * 60 * 10),
  };

  function generateUrl(type, page, period, key) {
    return `https://ws.audioscrobbler.com/2.0/?method=${type}
        &user=${state.userName}
        &api_key=${key}
        &format=json
        &period=${period}
        &page=${page}`;
  }

  function handleReturn(res: Response): Promise<any> {
    return Promise.all([res.ok, res.json()])
      .then(([ok, body]) => {
        console.log(ok);
        console.log(body);
        if (ok) {
          return body;
        }
        throw Error(body.message);
      });
  }

  const userQuery = (userName) => useQuery(['user', userName], () => {
    const url = (`https://ws.audioscrobbler.com/2.0/?method=user.getinfo
        &user=${userName}
        &api_key=${apiKey}
        &format=json`).trim();
    return fetch(url)
      .then((res) => handleReturn(res))
      .then((body) => {
        localStorage.setItem('userName', state.userName);
        return body;
      })
      .catch((err) => {
        actions.setModalErrorMessage(err.message);
        actions.setShowModal(true);
        actions.setUserName('shicks255');
      });
  }, queryOptions);

  const recentTracksQuery: (number) => QueryObserverResult<RecentTracks, Error> = (page: number) => useQuery(['recentTracks', state.userName, page], () => {
    const url = generateUrl('user.getrecenttracks', page, '', apiKey);
    return fetch(url)
      .then((res) => handleReturn(res))
      .then((body) => body.recenttracks)
      .catch((err) => {
        throw Error(JSON.stringify({
          technical: err.message,
          business: 'Problem loading recent tracks',
        }));
      });
  },
  { refetchInterval: 30000, refetchOnWindowFocus: false });

  const recentTracksBigQuery: () => QueryObserverResult<RecentTracks, Error> = () => useQuery(['recentTracks', 'big', state.userName], () => {
    const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks
        &user=${state.userName}
        &api_key=${apiKey}
        &format=json
        &limit=200
        &page=1`;
    return fetch(url)
      .then((res) => handleReturn(res))
      .then((body) => body.recenttracks)
      .catch((err) => {
        throw Error(JSON.stringify({
          technical: err.message,
          business: 'Problem loading recent tracks',
        }));
      });
  }, queryOptions);

  const topArtistsQuery: (string, number) => QueryObserverResult<TopArtists, Error> = (timeFrame, page) => useQuery(['topArtists', state.userName, timeFrame, page], () => {
    const url = generateUrl('user.getTopArtists', page, timeFrame, apiKey);
    return fetch(url)
      .then(
        (res) => handleReturn(res),
        (err) => {
          console.log(err);
          return Error('Failed to fetch');
        },
      )
      .then((body) => body.topartists)
      .catch((err) => {
        console.log('Error in top artists');
        throw Error(JSON.stringify({
          technical: err.message,
          business: 'Problem loading top artists',
        }));
      });
  }, queryOptions);

  const topAlbumsQuery: (string, number) => QueryObserverResult<TopAlbums, Error> = (timeFrame, page) => useQuery(['topAlbums', state.userName, timeFrame, page], () => {
    const url = generateUrl('user.getTopAlbums', page, timeFrame, apiKey);
    return fetch(url)
      .then((res) => handleReturn(res))
      .then((body) => body.topalbums)
      .catch((err) => {
        throw Error(JSON.stringify({
          business: 'Problem loading top albums',
          technical: err.message,
        }));
      });
  }, queryOptions);

  const topTracksQuery: (string, number) => QueryObserverResult<TopTracks, Error> = (timeFrame, page) => useQuery(['topTracks', state.userName, timeFrame, page], () => {
    const url = generateUrl('user.getTopTracks', page, timeFrame, apiKey);
    return fetch(url)
      .then((res) => handleReturn(res))
      .then((body) => body.toptracks)
      .catch((err) => {
        throw Error(JSON.stringify({
          technical: err.message,
          business: 'Problem loading top tracks',
        }));
      });
  }, queryOptions);

  const artistImageQuery = (mbid, artistName) => useQuery(['artistImage', mbid, artistName], () => getActualArtistUrl(mbid, artistName), queryOptions);

  return {
    userQuery,
    recentTracksQuery,
    topArtistsQuery,
    topAlbumsQuery,
    topTracksQuery,
    recentTracksBigQuery,
    artistImageQuery,
  };
}
