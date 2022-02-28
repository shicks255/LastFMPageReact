import { parse } from 'query-string';

export const timeFrames = {
  '7day': '7 Days',
  '1month': '1 Month',
  '3month': '3 Months',
  '6month': '6 Months',
  '12month': '1 Year',
  overall: 'All Time'
};

export const strategies = {
  getTopArtists: 'Artists',
  getTopAlbums: 'Albums',
  getTopTracks: 'Songs'
};

export const chartColors = [
  'rgb(190, 174, 212)',
  'rgb(127, 201, 127)',
  'rgb(191, 91, 23)',
  'rgb(240, 2, 127)',
  'rgb(91,132,186)',
  'rgb(255, 255, 153)',
  'rgb(253, 192, 134)',
  'rgb(202,57,57)',
  'rgb(84,162,108)',
  'rgb(156, 121, 201)',
  'rgb(147,195,9)',
  'rgb(221,124,60)',
  'rgb(221,124,63)',
  'rgb(221,124,65)',
  'rgb(221,124,12)',
  'rgb(221,124,44)',
  'rgb(221,124,55)',
  'rgb(221,12,60)',
  'rgb(221,144,60)',
  'rgb(11,124,60)',
  'rgb(21,424,60)',
  'rgb(29,99,60)',
  'rgb(555,124,60)',
  'rgb(321,24,60)',
  'rgb(94,24,60)',
  'rgb(221,124,60)',
  'rgb(221,124,60)',
  'rgb(221,124,60)',
  'rgb(221,124,60)',
  'rgb(221,124,60)',
  'rgb(221,124,60)',
  'rgb(221,124,60)',
  'rgb(221,124,60)',
  'rgb(221,124,60)',
  'rgb(221,124,60)',
  'rgb(221,124,60)',
  'rgb(221,124,60)',
  'rgb(221,124,60)',
  'rgb(221,124,60)',
  'rgb(221,124,60)',
  'rgb(221,124,60)',
  'rgb(221,124,60)',
  'rgb(221,124,60)'
];

export const years = {
  2002: ['2002-01-01', '2002-12-31', '2002-01-02'],
  2003: ['2003-01-01', '2003-12-31', '2003-01-02'],
  2004: ['2004-01-01', '2004-12-31', '2004-01-02'],
  2005: ['2005-01-01', '2005-12-31', '2005-01-02'],
  2006: ['2006-01-01', '2006-12-31', '2006-01-02'],
  2007: ['2007-01-01', '2007-12-31', '2007-01-02'],
  2008: ['2008-01-01', '2008-12-31', '2008-01-02'],
  2009: ['2009-01-01', '2009-12-31', '2009-01-02'],
  2010: ['2010-01-01', '2010-12-31', '2010-01-02'],
  2011: ['2011-01-01', '2011-12-31', '2011-01-02'],
  2012: ['2012-01-01', '2012-12-31', '2012-01-02'],
  2013: ['2013-01-01', '2013-12-31', '2013-01-02'],
  2014: ['2014-01-01', '2014-12-31', '2014-01-02'],
  2015: ['2015-01-01', '2015-12-31', '2015-01-02'],
  2016: ['2016-01-01', '2016-12-31', '2016-01-02'],
  2017: ['2017-01-01', '2017-12-31', '2017-01-02'],
  2018: ['2018-01-01', '2018-12-31', '2018-01-02'],
  2019: ['2019-01-01', '2019-12-31', '2019-01-02'],
  2020: ['2020-01-01', '2020-12-31', '2020-01-02'],
  2021: ['2021-01-01', '2021-12-31', '2021-01-02']
};

export const months = {
  Jan: 1,
  Feb: 2,
  Mar: 3,
  Apr: 4,
  May: 5,
  Jun: 6,
  Jul: 7,
  Aug: 8,
  Sep: 9,
  Oct: 10,
  Nov: 11,
  Dec: 12
};

export function getDateRangeFromTimeFrame(timeFrame: string): Array<string> {
  const from: Date = new Date();
  const to: Date = new Date();

  if (timeFrame === '7day') {
    from.setDate(from.getDate() - 7);
  }
  if (timeFrame === '1month') {
    from.setMonth(from.getMonth() - 1);
  }
  if (timeFrame === '3month') {
    from.setMonth(from.getMonth() - 3);
  }
  if (timeFrame === '6month') {
    from.setMonth(from.getMonth() - 6);
  }
  if (timeFrame === '12month') {
    from.setFullYear(from.getFullYear() - 1);
  }
  if (timeFrame === 'overall') {
    from.setFullYear(from.getFullYear() - 20);
  }

  let fromDay: number | string = from.getDate() + 1;
  if (fromDay < 10) fromDay = `0${fromDay}`;
  let toDay: number | string = to.getDate();
  if (toDay < 10) toDay = `0${toDay}`;

  let fromMonth: number | string = from.getMonth() + 1;
  if (fromMonth < 10) fromMonth = `0${fromMonth}`;
  let toMonth: number | string = to.getMonth() + 1;
  if (toMonth < 10) toMonth = `0${toMonth}`;

  const fromString = `${from.getFullYear()}-${fromMonth}-${fromDay}`;
  const toString = `${to.getFullYear()}-${toMonth}-${toDay}`;

  return [fromString, toString];
}

export function getTimeGroupFromTimeFrame(timeFrame: string): string {
  let timeGroup = 'DAY';

  if (timeFrame === '7day') {
    timeGroup = 'DAY';
  }
  if (timeFrame === '1month') {
    timeGroup = 'DAY';
  }
  if (timeFrame === '3month') {
    timeGroup = 'WEEK';
  }
  if (timeFrame === '6month') {
    timeGroup = 'MONTH';
  }
  if (timeFrame === '12month') {
    timeGroup = 'MONTH';
  }
  if (timeFrame === 'overall') {
    timeGroup = 'YEAR';
  }

  return timeGroup;
}

const fanartKey = process.env.REACT_APP_FANART_KEY;
const noImageUrl =
  'https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png';

function getMusicBrainzId(artistName) {
  const fullName = encodeURI(artistName);
  return fetch(`https://musicbrainz.org/ws/2/artist/?query=${fullName}&fmt=json`, {
    headers: {
      'User-Agent': 'SteveFM/1.0 https:\\/\\/music.stevenmhicks.com shicks255@yahoo.com'
    }
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.artists) {
        const mbid = res.artists[0].id;
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        return getFanArtImage(mbid, artistName, true);
      }
      return noImageUrl;
    });
}

function getFanArtImage(mbid, artistName, secondTry) {
  let imageUrl = '';
  const url = `https://webservice.fanart.tv/v3/music/${mbid}?api_key=${fanartKey}&format=json`;
  return fetch(url)
    .then((res) => res.json())
    .then((res) => {
      if (res.artistthumb) {
        imageUrl = res.artistthumb[0].url;
      } else if (res.artistbackground) {
        imageUrl = res.artistbackground[0].url;
      } else if (res.hdmusiclogo) {
        imageUrl = res.hdmusiclogo[0].url;
      } else if (res.musiclogo) {
        imageUrl = res.musiclogo[0].url;
      } else if (res.albums && res.albums[0]) {
        imageUrl = res.albums[0].albumcover[0].url;
      } else if (!secondTry) {
        return getMusicBrainzId(artistName);
      } else {
        imageUrl = noImageUrl;
      }

      return imageUrl;
    });
}

export function stripPageQueryParam(search: string): number {
  const parsed = parse(search.slice(1));
  const maybePageNumber = parsed.page;
  return Number(maybePageNumber) || 1;
}

export function stripTimeFrameQueryParam(search: string): string {
  const parsed = parse(search.slice(1));
  const maybeTimeFrame = parsed.timeFrame as string;
  if (!Object.keys(timeFrames).includes(maybeTimeFrame)) {
    return '7day';
  }
  return maybeTimeFrame || '7day';
}

export function getActualArtistUrl(mbid: string, artistName: string): string {
  return mbid && mbid.length > 0
    ? getFanArtImage(mbid, artistName, false)
    : getMusicBrainzId(artistName);
}

export function convertDurationToTimestamp(duration: number): string {
  const min = Math.floor(duration / 60);
  const sec = duration - min * 60;
  const secString = sec < 10 ? `0${sec.toString()}` : sec.toString();
  return `${min}:${secString.substr(0, 2)}`;
}

export function trimString(word: string, max = 25): string {
  if (word.length < max) {
    return word;
  }

  return `${word.slice(0, max)}...`;
}
