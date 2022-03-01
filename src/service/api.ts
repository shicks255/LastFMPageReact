import { onlineManager } from 'react-query';

import { ITopAlbumsResponse } from '@/types/TopAlbums';
import { IUser } from '@/types/User';
import UserStats from '@/types/UserStats';

const apiKey = process.env.REACT_APP_LAST_FM_KEY;
const musicApi = 'https://musicapi.shicks255.com/api/v1';
const audioscrobblerApi = 'https://ws.audioscrobbler.com/2.0';

function generateUrl(type, page, period, key, userName) {
  return `https://ws.audioscrobbler.com/2.0/?method=${type}
        &user=${userName}
        &api_key=${key}
        &format=json
        &period=${period}
        &page=${page}`;
}

function throwErrorIfOffline(businessError) {
  if (!onlineManager.isOnline()) {
    onlineManager.setOnline(true);
    throw new Error(
      JSON.stringify({
        technical: 'No connection',
        business: businessError
      })
    );
  }
}

function userQuery(userName: string): Promise<IUser> {
  const url = `${audioscrobblerApi}?method=user.getinfo
        &user=${userName}
        &api_key=${apiKey}
        &format=json`;
  throwErrorIfOffline('Problem loading user');
  return fetch(url)
    .then((res) => Promise.all([res.ok, res.json()]))
    .then(([ok, body]) => {
      if (!ok) {
        localStorage.setItem('userName', 'shicks255');
        throw new Error(
          JSON.stringify({
            technical: body.message,
            business: 'Problem loading user'
          })
        );
      }
      localStorage.setItem('userName', userName);
      return body.user;
    });
}

function checkUserName(userName: string): Promise<boolean> {
  const url = `https://ws.audioscrobbler.com/2.0/?method=user.getinfo
        &user=${userName}
        &api_key=${apiKey}
        &format=json`;
  return fetch(url)
    .then((res) => res.ok)
    .then((ok) => ok);
}

// eslint-disable-next-line max-len
function recentTracksQuery(page: number, userName: string): Promise<Response> {
  const url = generateUrl('user.getrecenttracks', page, '', apiKey, userName);
  throwErrorIfOffline('Problem loading recent tracks');
  return fetch(url)
    .then((res) => Promise.all([res.ok, res.json()]))
    .then(([ok, body]) => {
      if (!ok) {
        throw new Error(
          JSON.stringify({
            technical: body.message,
            business: 'Problem loading recent tracks'
          })
        );
      }
      return body.recenttracks;
    });
}

function recentTracksBigQuery(userName: string): Promise<Response> {
  const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks
        &user=${userName}
        &api_key=${apiKey}
        &format=json
        &limit=200
        &page=1`;
  throwErrorIfOffline('Problem loading recent tracks');
  return fetch(url)
    .then((res) => Promise.all([res.ok, res.json()]))
    .then(([ok, body]) => {
      if (!ok) {
        throw Error(
          JSON.stringify({
            technical: body.message,
            business: 'Problem loading recent tracks'
          })
        );
      }
      return body.recenttracks;
    });
}

function topAlbumsQuery(
  timeFrame: string,
  page: number,
  userName: string
): Promise<ITopAlbumsResponse> {
  const url = generateUrl('user.getTopAlbums', page, timeFrame, apiKey, userName);
  throwErrorIfOffline('Problem loading top albums');
  return fetch(url)
    .then((res) => Promise.all([res.ok, res.json()]))
    .then(([ok, body]) => {
      if (!ok) {
        throw Error(
          JSON.stringify({
            business: 'Problem loading top albums',
            technical: body.message
          })
        );
      }
      return body;
    });
}

function topTracksQuery(timeFrame: string, page: number, userName: string): Promise<Response> {
  const url = generateUrl('user.getTopTracks', page, timeFrame, apiKey, userName);
  throwErrorIfOffline('Problem loading top tracks');
  return fetch(url)
    .then((res) => Promise.all([res.ok, res.json()]))
    .then(([ok, body]) => {
      if (!ok) {
        throw Error(
          JSON.stringify({
            technical: body.message,
            business: 'Problem loading top tracks'
          })
        );
      }
      return body.toptracks;
    });
}

function topArtistsQuery(timeFrame: string, page: number, userName: string): Promise<Response> {
  const url = generateUrl('user.getTopArtists', page, timeFrame, apiKey, userName);
  throwErrorIfOffline('Problem loading top artists');
  return fetch(url)
    .then((res) => Promise.all([res.ok, res.json()]))
    .then(([ok, body]) => {
      if (!ok) {
        throw Error(
          JSON.stringify({
            technical: body.message,
            business: 'Problem loading top artists'
          })
        );
      }
      return body.topartists;
    });
}

function scrobblesQuery(
  userName: string,
  artistName?: string,
  albumName?: string,
  from?: string,
  to?: string,
  limit?: number,
  sort?: string,
  direction?: string
): Promise<Response> {
  return fetch(
    `${musicApi}/scrobbles?userName=${userName}&artistName=${artistName}&albumName=${albumName}$from=${from}&to=${to}&limit=${limit}&sort=${sort}&direction=${direction}`
  )
    .then((res) => res.json())
    .then((res) => res);
}

function scrobblesGroupedQuery(
  userName: string,
  timeGroup: string,
  from?: string,
  to?: string
): Promise<Response> {
  return fetch(
    `${musicApi}/scrobbles/grouped?userName=${userName}&from=${from}&to=${to}&timeGroup=${timeGroup}`
  )
    .then((res) => res.json())
    .then((res) => res);
}

function scrobblesAlbumOrArtistGroupedQuery(
  resource: string,
  userName: string,
  timeGroup: string,
  start?: string,
  end?: string,
  limit?: number,
  empties?: boolean
): Promise<Response> {
  let url = `${musicApi}/scrobbles/${resource}?userName=${userName}&timeGroup=${timeGroup}`;
  if (start) {
    url += `&from=${start}`;
  }
  if (end) {
    url += `&to=${end}`;
  }
  if (limit) {
    url += `&limit=${limit}`;
  }
  if (empties) {
    url += `&empties=${empties}`;
  }

  return fetch(url)
    .then((res) => res.json())
    .then((res) => res);
}

function userStatsQuery(userName: string): Promise<UserStats> {
  return fetch(`${musicApi}/user/stats?userName=${userName}`)
    .then((res) => res.json())
    .then((res) => res);
}

export {
  userQuery,
  checkUserName,
  recentTracksQuery,
  recentTracksBigQuery,
  scrobblesGroupedQuery,
  topTracksQuery,
  topAlbumsQuery,
  topArtistsQuery,
  scrobblesQuery,
  scrobblesAlbumOrArtistGroupedQuery,
  userStatsQuery,
  audioscrobblerApi,
  musicApi
};
