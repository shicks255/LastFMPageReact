/* eslint-disable @typescript-eslint/ban-ts-comment */
import { parse } from 'query-string';

// export const musicApi = 'http://localhost:8686/api/v1';
export const musicApi = 'https://musicapi.shicks255.com/api/v1';

export const timeFrames = {
  '7day': '7 Days',
  '1month': '1 Month',
  '3month': '3 Months',
  '6month': '6 Months',
  '12month': '1 Year',
  '2year': '2 Years',
  '3year': '3 Years',
  '5year': '5 Years',
  '10year': '10 Years',
  '15year': '15 Years',
  overall: 'All Time'
};

export const internalTimeFrames = ['2year', '3year', '5year', '10year', '15year'];

export const strategies = {
  getTopArtists: 'Artists',
  getTopAlbums: 'Albums',
  getTopTracks: 'Songs'
};

export const cColors = [
  'rgb(51, 155, 23',
  'rgb(23, 51, 155)',
  'rgb(155, 23, 36)',
  'rgb(102, 102, 102)',
  'rgb(166, 118, 29)',
  'rgb(186, 191, 42)',
  'rgb(247, 123, 37)',
  'rgb(230, 26, 185)',
  'rgb(140, 38, 211)',
  'rgb(49, 218, 28)',
  'rgb(16, 88, 241)',
  'rgb(247, 42, 42)'
];

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
  2021: ['2021-01-01', '2021-12-31', '2021-01-02'],
  2022: ['2022-01-01', '2022-12-31', '2022-01-02'],
  2023: ['2023-01-01', '2023-12-31', '2023-01-02'],
  2024: ['2024-01-01', '2024-12-31', '2024-01-02'],
  2025: ['2025-01-01', '2025-12-31', '2025-01-02'],
  2026: ['2026-01-01', '2026-12-31', '2026-01-02'],
  2027: ['2027-01-01', '2027-12-31', '2027-01-02'],
  2028: ['2028-01-01', '2028-12-31', '2028-01-02'],
  2029: ['2029-01-01', '2029-12-31', '2029-01-02'],
  2030: ['2030-01-01', '2030-12-31', '2030-01-02'],
  2031: ['2031-01-01', '2031-12-31', '2031-01-02']
};

export function getYearsFromUserYears(userYears: string[]) {
  const toReturn = {};

  userYears.forEach((year) => {
    toReturn[Number(year)] = years[year];
  });

  return toReturn;
}

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

interface IDateRange {
  start: string;
  end: string;
}

export function getDateRangeFromTimeFrame(timeFrame: string): IDateRange {
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
  if (timeFrame === '2year') {
    from.setFullYear(from.getFullYear() - 2);
  }
  if (timeFrame === '3year') {
    from.setFullYear(from.getFullYear() - 3);
  }
  if (timeFrame === '5year') {
    from.setFullYear(from.getFullYear() - 5);
  }
  if (timeFrame === '10year') {
    from.setFullYear(from.getFullYear() - 10);
  }
  if (timeFrame === '15year') {
    from.setFullYear(from.getFullYear() - 15);
  }
  if (timeFrame === 'overall') {
    from.setFullYear(from.getFullYear() - 20);
  }

  let fromDay: number | string = from.getDate();
  if (fromDay < 10) fromDay = `0${fromDay}`;
  let toDay: number | string = to.getDate();
  if (toDay < 10) toDay = `0${toDay}`;

  let fromMonth: number | string = from.getMonth() + 1;
  if (fromMonth < 10) fromMonth = `0${fromMonth}`;
  let toMonth: number | string = to.getMonth() + 1;
  if (toMonth < 10) toMonth = `0${toMonth}`;

  const fromString = `${from.getFullYear()}-${fromMonth}-${fromDay}`;
  const toString = `${to.getFullYear()}-${toMonth}-${toDay}`;

  return {
    start: fromString,
    end: toString
  };
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
  if (timeFrame === '12month' || timeFrame === '2year' || timeFrame === '3year') {
    timeGroup = 'MONTH';
  }
  if (
    timeFrame === '5year' ||
    timeFrame === '10year' ||
    timeFrame === '15year' ||
    timeFrame === 'overall'
  ) {
    timeGroup = 'YEAR';
  }

  return timeGroup;
}

const fanartKey = process.env.REACT_APP_FANART_KEY;

export const noImageUrl =
  'https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png';

export function getMusicBrainzId(artistName) {
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

export function getFanArtImage(mbid, artistName, secondTry) {
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

export function formatNumber(num: number | string): string {
  return new Intl.NumberFormat('en-US').format(Number(num));
}

export function formatDateToTime(date: Date): string[] {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  const hour = date.toLocaleString('en-us', {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true
  });

  return [`${month}/${day}/${year}`, `${hour}`];
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

export function generateLineChart(scrobbles, timeFrame, resourceType) {
  if (!scrobbles || !scrobbles.data) {
    return [];
  }
  const sortedDates = scrobbles?.data?.data
    .flatMap((x) => x.data)
    .flatMap((x) => x.timeGroup)
    .sort();

  const oldest = sortedDates[0];
  const newest = sortedDates[sortedDates.length - 1];
  const oldestDateWithPlays = scrobbles.data.data
    .flatMap((x) => x.data)
    .filter((x) => x.plays > 0)
    .sort((item1, item2) => {
      if (item1.timeGroup > item2.timeGroup) {
        return 1;
      }
      return -1;
    });

  const oldCutoff = timeFrame === 'overall' ? oldestDateWithPlays[0].timeGroup : oldest;

  const chartNew = scrobbles.data.data
    .map((item) => {
      const id =
        resourceType === 'artist'
          ? trimString(item.artistName, 35)
          : trimString(item.albumName || '', 35);
      const dataPoints = item.data;

      const dd = dataPoints
        .sort((dp1, dp2) => {
          if (dp1.timeGroup > dp2.timeGroup) return 1;
          return -1;
        })
        .filter((item) => item.timeGroup >= oldCutoff)
        .map((dp) => ({
          x: dp.timeGroup,
          y: dp.plays
        }));

      if (!dd.find((x) => x.x === oldest) && oldest >= oldCutoff) {
        dd.unshift({ x: oldest, y: 0 });
      }
      if (!dd.find((x) => x.x === newest)) {
        dd.push({ x: newest, y: 0 });
      }

      const totals = dd.reduce((prev, curr) => {
        return prev + curr.y;
      }, 0);

      return {
        id,
        total: totals,
        data: dd
      };
    })
    .sort((item1, item2) => {
      if (item1.total > item2.total) {
        return -1;
      }

      return 1;
    });

  return chartNew;
}

interface ICalData {
  plays: number;
  timeGroup: string;
}

export function generateCalendarChart(scrobbles) {
  if (!scrobbles || !scrobbles.data) {
    return [];
  }

  return scrobbles.data.data.map((item: ICalData) => ({
    day: item.timeGroup,
    value: item.plays
  }));
}

export function generateCalendarChart2(scrobbles) {
  if (!scrobbles || !scrobbles.data || scrobbles.data.data.length < 1) {
    return [];
  }

  return scrobbles.data.data[0].data
    .filter((item: ICalData) => {
      return item.plays && item.plays > 0;
    })
    .map((item: ICalData) => {
      return {
        day: item.timeGroup,
        value: item.plays > 0 ? item.plays : undefined
      };
    });
}

export function generateSunburstChart(scrobbles) {
  const t = {};

  if (!scrobbles || !scrobbles.data) {
    return t;
  }

  scrobbles.data.data.forEach((item) => {
    const id = item.artistName;
    if (Object.prototype.hasOwnProperty.call(t, id)) {
      const th = t[id];
      const album = item.albumName;
      const { plays } = item.data[0];
      const newTh = {
        id: album,
        value: plays
      };
      th.push(newTh);
      t[id] = th;
    } else {
      const album = item.albumName;
      const { total } = item;
      const newTh = {
        id: album,
        value: total
      };
      const children = [newTh];
      t[id] = children;
    }
  });

  const colorMap = {};

  const pp = Object.entries(t).map((k, index) => {
    colorMap[k[0]] = cColors[index];
    return {
      id: k[0],
      color: cColors[index],
      children: k[1]
    };
  });

  const data = {
    id: 'albums',
    color: '#a32929',
    children: pp
  };

  return data;
}

export function generatePieChart(scrobbles) {
  if (!scrobbles || !scrobbles.data) {
    return [];
  }

  return scrobbles.data.data.map((item) => {
    return {
      id: item.albumName.split(' - ')[0],
      value: item.total
    };
  });
}

export function generateBumpChart(scrobbles, resourceType) {
  if (!scrobbles || !scrobbles.data) {
    return [];
  }

  const countPerTimeGroup = scrobbles?.data?.data.map((result) => {
    let runningTotal = 0;
    const items = result.data;
    const nestedPlays = items.map((item) => {
      runningTotal += item.plays;
      return {
        plays: runningTotal,
        timeGroup: item.timeGroup
      };
    });

    if (resourceType === 'artist') {
      return {
        artistName: result.artistName,
        data: nestedPlays
      };
    }
    return {
      albumName: result.albumName,
      data: nestedPlays
    };
  });

  const darRanks = {};
  const timeGroups = countPerTimeGroup[0]?.data.map((x) => x.timeGroup);
  timeGroups?.forEach((tg) => {
    const dayRank: string[] = [];
    const itemsForDay = countPerTimeGroup
      .map((item) => {
        const dayPlay = item.data.filter((x) => x.timeGroup === tg);
        if (resourceType === 'artist') {
          return {
            name: item.artistName || '',
            plays: dayPlay[0]?.plays
          };
        }
        return {
          name: item.albumName || '',
          plays: dayPlay[0].plays
        };
      })
      .sort((item1, item2) => {
        if (item1.plays > item2.plays) return 1;
        return -1;
      });

    itemsForDay
      .sort((ifd1, ifd2) => {
        if (ifd1.plays > ifd2.plays) return 1;
        return -1;
      })
      .reverse()
      .forEach((d) => {
        dayRank.push(d.name);
      });

    darRanks[tg] = dayRank;
  });

  const artists =
    resourceType === 'artist'
      ? scrobbles.data.data.map((x) => x.artistName)
      : scrobbles.data.data.map((x) => x.albumName);

  const finalNewChart = artists.map((artist) => {
    const myRanks = Object.entries(darRanks).map(([k, v]) => ({
      x: k,
      //@ts-ignore
      y: v.indexOf(artist) + 1
    }));

    return {
      id: artist,
      data: myRanks
    };
  });

  return finalNewChart;
}
