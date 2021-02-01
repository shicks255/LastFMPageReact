import { useQuery } from 'react-query';
import { useContext } from 'react';
import { LocalStateContext } from '../LocalStateContext';
import { getActualArtistUrl } from '../utils';

export default function useLastFmApi() {
  const { state, actions } = useContext(LocalStateContext);
  const apiKey = process.env.REACT_APP_LAST_FM_KEY;

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
        if (ok) {
          return body;
        }
        throw Error(body.message);
      });
  }

  const userQuery = useQuery(['user', state.userName], () => {
    const url = (`https://ws.audioscrobbler.com/2.0/?method=user.getinfo
        &user=${state.userName}
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
  });

  const recentTracksQuery = useQuery(['recentTracks', state.page, state.userName], () => {
    const url = generateUrl('user.getrecenttracks', state.page, '', apiKey);
    return fetch(url)
      .then((res) => handleReturn(res))
      .then((body) => {
        if (body.recenttracks.track[0]?.['@attr']?.nowplaying) {
          actions.setNowPlaying(body.recenttracks.track[0]);
        }
        actions.setRecentTracksError(undefined);
        return body.recenttracks;
      })
      .catch((err) => {
        actions.setRecentTracksError({
          technical: err.message,
          business: 'Problem loading recent tracks',
        });
      });
  }, { refetchInterval: 30_000 });

  const recentTracksBigQuery = useQuery(['recentTracks', 'big', state.userName], () => {
    const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks
        &user=${state.userName}
        &api_key=${apiKey}
        &format=json
        &limit=200
        &page=1`;
    return fetch(url)
      .then((res) => handleReturn(res))
      .then((body) => {
        actions.setRecentTracksBigError(undefined);
        return body.recenttracks.track.filter((x) => Object.prototype.hasOwnProperty.call(x, 'artist'));
      })
      .catch((err) => {
        actions.setRecentTracksBigError({
          technical: err.message,
          business: 'Problem loading recent tracks',
        });
      });
  });

  const topArtistsQuery = useQuery(['topArtists', state.page, state.timeFrame, state.userName], () => {
    const url = generateUrl('user.getTopArtists', state.page, state.timeFrame, apiKey);
    return fetch(url)
      .then((res) => handleReturn(res))
      .then((body) => {
        actions.setTopArtistsError(undefined);
        return body.topartists;
      })
      .catch((err) => {
        actions.setTopArtistsError({
          technical: err.message,
          business: 'Problem loading top artists',
        });
      });
  });

  const topAlbumsQuery = useQuery(['topAlbums', state.page, state.timeFrame, state.userName], () => {
    const url = generateUrl('user.getTopAlbums', state.page, state.timeFrame, apiKey);
    return fetch(url)
      .then((res) => handleReturn(res))
      .then((body) => {
        actions.setTopAlbumsError(undefined);
        return body.topalbums;
      })
      .catch((err) => {
        actions.setTopAlbumsError({
          business: 'Problem loading top albums',
          technical: err.message,
        });
      });
  });

  const topTracksQuery = useQuery(['topTracks', state.page, state.timeFrame, state.userName], () => {
    const url = generateUrl('user.getTopTracks', state.page, state.timeFrame, apiKey);
    return fetch(url)
      .then((res) => handleReturn(res))
      .then((body) => {
        actions.setTopTracksError(undefined);
        return body.toptracks;
      })
      .catch((err) => {
        actions.setTopTracksError({
          technical: err.message,
          business: 'Problem loading top tracks',
        });
      });
  });

  const artistImageQuery = (mbid, artistName) => useQuery(['artistImage', mbid, artistName], () => getActualArtistUrl(mbid, artistName));

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
