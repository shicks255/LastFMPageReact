import { rest } from 'msw';

import { MONEY } from '@/mocks/constants';
import { musicApi } from '@/service/api';
import { IRecentTracks } from '@/types/RecentTracks';
import { IScrobbleData, IScrobblesGrouped } from '@/types/Scrobble';
import IUserStats, { IDifference } from '@/types/UserStats';

const timestate: IDifference = {
  zero: true,
  negative: true,
  years: 1,
  chronology: {
    id: '',
    calendarType: ''
  },
  days: 1,
  months: 1,
  units: {
    dateBased: false,
    timeBased: false,
    durationEstimated: false,
    duration: {
      negative: false,
      nano: 1,
      seconds: 1,
      zero: false
    }
  }
};

const getScrobbles = rest.get(`${musicApi}/scrobbles`, (req, res, ctx) => {
  const s = req.url.searchParams;

  const scrobbles: IRecentTracks = {
    track: [MONEY],
    '@attr': {
      page: 1,
      perPage: 1,
      user: '',
      total: 1,
      totalPages: 1
    }
  };

  return res(ctx.json(scrobbles));
});

const getScrobblesGrouped = rest.get(`${musicApi}/scrobbles/grouped`, (req, res, ctx) => {
  const scrobbles: IScrobbleData[] = [
    {
      timeGroup: '2021-03-17',
      plays: 25
    },
    {
      timeGroup: '2021-03-18',
      plays: 10
    }
  ];

  return res(ctx.json(scrobbles));
});

const getScrobblesGroupedAlbum = rest.get(
  `${musicApi}/scrobbles/albumsGrouped`,
  (req, res, ctx) => {
    const data: IScrobblesGrouped = {
      data: [
        {
          artistName: 'Pink Floyd',
          albumName: 'Dark Side of the Moon',
          total: 100,
          data: [
            {
              timeGroup: '7day',
              plays: 1
            }
          ]
        }
      ]
    };

    return res(ctx.json(data));
  }
);

const getScrobblesGroupedArtist = rest.get(
  `${musicApi}/scrobbles/artistsGrouped`,
  (req, res, ctx) => {
    const data: IScrobblesGrouped = {
      data: [
        {
          artistName: 'Pink Floyd',
          total: 100,
          data: [
            {
              timeGroup: '7day',
              plays: 1
            }
          ]
        }
      ]
    };

    return res(ctx.json(data));
  }
);

const getUserStats = rest.get(`${musicApi}/user/stats`, (req, res, ctx) => {
  const stats: IUserStats = {
    longestDormancyAlbum: {
      extra: 'test',
      name: 'test',
      timeStat: {
        newest: 'test',
        oldest: 'test',
        difference: timestate
      }
    },
    longestDormancyArtist: {
      name: 'test',
      extra: 'test',
      timeStat: {
        newest: 'test',
        oldest: 'test',
        difference: timestate
      }
    },
    oldestAndNewestAlbum: {
      name: 'test',
      extra: 'test',
      timeStat: {
        newest: 'test',
        oldest: 'tes',
        difference: timestate
      }
    },
    oldestAndNewestArtist: {
      name: 'test',
      extra: 'test',
      timeStat: {
        newest: 'test',
        oldest: 'test',
        difference: timestate
      }
    },
    firstTo1000Album: {
      name: 'test',
      extra: 'test',
      timeStat: {
        newest: 'test',
        oldest: 'test',
        difference: timestate
      }
    },
    firstTo1000Artist: {
      name: 'test',
      extra: 'test',
      timeStat: {
        newest: 'test',
        oldest: 'test',
        difference: timestate
      }
    },
    firstTo100Artist: {
      name: 'test',
      extra: 'test',
      timeStat: {
        newest: 'test',
        oldest: 'test',
        difference: timestate
      }
    },
    firstTo100Album: {
      name: 'test',
      extra: 'test',
      timeStat: {
        newest: 'test',
        oldest: 'test',
        difference: timestate
      }
    },
    firstTo100Song: {
      name: 'test',
      extra: 'test',
      timeStat: {
        newest: 'test',
        oldest: 'test',
        difference: timestate
      }
    },
    firstTo200Song: {
      name: 'test',
      extra: 'test',
      timeStat: {
        newest: 'test',
        oldest: 'test',
        difference: timestate
      }
    }
  };
});

const musicApiHandlers = [
  getScrobbles,
  getScrobblesGrouped,
  getScrobblesGroupedAlbum,
  getScrobblesGroupedArtist,
  getUserStats
];
export default musicApiHandlers;
