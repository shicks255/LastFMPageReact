/* eslint-disable no-console */
import { useQuery } from 'react-query';
import { useContext } from 'react';
import { LocalStateContext } from './LocalStateContext';
import { getActualArtistUrl } from './utils';

function generateUrl(type, page, period, key) {
  return `https://ws.audioscrobbler.com/2.0/?method=${type}
        &user=shicks255
        &api_key=${key}
        &format=json
        &period=${period}
        &page=${page}`;
}

export default function useLastFmApi() {
  const { state, actions } = useContext(LocalStateContext);
  const apiKey = process.env.REACT_APP_LAST_FM_KEY;

  const userQuery = useQuery(['user', state.userName], () => {
    const url = (`https://ws.audioscrobbler.com/2.0/?method=user.getinfo
        &user=${state.userName}
        &api_key=${apiKey}
        &format=json`).trim();
    return fetch(url)
      .then((res) => res.json())
      .then(
        (res) => res,
        (err) => {
          actions.setModalErrorMessage(err);
          actions.setShowModal(true);
          actions.setUserName('shicks255');
        },
      );
  });

  const recentTracksQuery = useQuery(['recentTracks', state.page], () => {
    const url = generateUrl('user.getrecenttracks', state.page, '', apiKey);
    return fetch(url)
      .then((res) => res.json())
      .then(
        (res) => {
          if (res.recenttracks) {
            if (res.recenttracks.track[0]?.['@attr']?.nowplaying) {
              actions.setNowPlaying(res.recenttracks.track[0]);
            }
            return res.recenttracks;
          }
          return [];
        },
        (err) => {
          console.log(err);
        },
      );
  }, { refetchInterval: 30_000 });

  const recentTracksBigQuery = useQuery(['recentTracks', 'big'], () => {
    const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks
        &user=shicks255
        &api_key=${apiKey}
        &format=json
        &limit=200
        &page=1`;
    return fetch(url)
      .then((res) => res.json())
      .then(
        (res) => {
          if (res.recenttracks) {
            return res.recenttracks.track.filter((x) => Object.prototype.hasOwnProperty.call(x, 'artist'));
          }
          return [];
        },
        (err) => {
          console.log(err);
        },
      );
  });

  const topArtistsQuery = useQuery(['topArtists', state.page, state.timeFrame], () => {
    const url = generateUrl('user.getTopArtists', state.page, state.timeFrame, apiKey);
    return fetch(url)
      .then((res) => res.json())
      .then(
        (res) => {
          if (res.topartists) {
            return res.topartists;
          }
          return [];
        },
        (err) => {
          console.log(err);
        },
      );
  });

  const topAlbumsQuery = useQuery(['topAlbums', state.page, state.timeFrame], () => {
    const url = generateUrl('user.getTopAlbums', state.page, state.timeFrame, apiKey);
    return fetch(url)
      .then((res) => res.json())
      .then(
        (res) => {
          if (res.topalbums) {
            return res.topalbums;
          }
          return [];
        },
        (err) => {
          console.log(err);
        },
      );
  });

  const topTracksQuery = useQuery(['topTracks', state.page, state.timeFrame], () => {
    const url = generateUrl('user.getTopTracks', state.page, state.timeFrame, apiKey);
    return fetch(url)
      .then((res) => res.json())
      .then(
        (res) => {
          if (res.toptracks) {
            return res.toptracks;
          }
          return [];
        },
        (err) => {
          console.log(err);
        },
      );
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
