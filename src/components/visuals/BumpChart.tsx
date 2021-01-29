import React from 'react';
import { ResponsiveBump } from '@nivo/bump';
import { QueryObserverResult } from 'react-query';
import Loader from '../Loader';
import { Track } from '../../types/Track';

// todo, if the difference between oldest and newest is more than 30 days, cap it to 30 days
// so that the bump chart is not insanely long

type Props = {
  recentTracksQuery: QueryObserverResult<Track[]>
}

export default function BumpChart(props: Props) {
  const { recentTracksQuery } = props;

  if (recentTracksQuery.isLoading || !recentTracksQuery.data) return <Loader small={false} />;

  const recentTracks = recentTracksQuery.data
    .filter((x) => Object.prototype.hasOwnProperty.call(x, 'artist'))
    .filter((x) => Object.prototype.hasOwnProperty.call(x, 'date'));

  const tracks = recentTracks.sort((x, y) => (x.date.uts > y.date.uts ? 1 : -1));
  const oldest = tracks[0] ? new Date(tracks[0].date.uts * 1000) : '';
  const newest = tracks[tracks.length - 1]
    ? new Date(tracks[tracks.length - 1].date.uts * 1000)
    : new Date();

  if (tracks.length <= 0) { return <div>Loading...</div>; }

  newest.setHours(23);
  newest.setMinutes(59);
  newest.setSeconds(59);

  // returns {"Pink Floyd": [PlayTimestamps]
  const tracksByArtist:
      {[key: string]: number[] } = tracks.reduce((accum, curr) => {
        if (curr.date) {
          if (Object.prototype.hasOwnProperty.call(accum, curr.artist['#text'])) {
            accum[curr.artist['#text']].push(curr.date.uts);
          } else {
            const trackz: number[] = [];
            trackz.push(curr.date.uts);
            accum[curr.artist['#text']] = trackz;
          }
        }
        return accum;
      }, { '': [] });

  const data: {id: string, data: { x: string, y: number }[] }[] = [];
  const tracksByArtistNameString: {[key: string]: string[]} = {};

  Object.entries(tracksByArtist)
    .sort((x, y) => {
      if (x[1].length > y[1].length) { return -1; }
      return 1;
    })
    .slice(0, 15)
    .forEach((a) => {
      const artistName = a[0];
      // make the dates actual days
      tracksByArtistNameString[artistName] = tracksByArtist[artistName].map((i) => {
        const d = new Date(i * 1000);
        return `${d.getMonth() + 1}/${(`0${d.getDate()}`).slice(-2)}/${d.getFullYear()}`;
      });

      // returns {12/25: 5, 12/26: 1}
      const dayPlayCount:
          {[key: string]: number} = tracksByArtistNameString[artistName].reduce((accum, date) => {
            if (accum && Object.prototype.hasOwnProperty.call(accum, date)) {
              accum[date] += 1;
            } else {
              accum[date] = 1;
            }

            return accum;
          }, {});

      // adds any missing dates with 0 playcount
      for (let d = new Date(oldest); d <= newest; d.setDate(d.getDate() + 1)) {
        const key = `${d.getMonth() + 1}/${(`0${d.getDate()}`).slice(-2)}/${d.getFullYear()}`;
        if (!Object.prototype.hasOwnProperty.call(dayPlayCount, key)) {
          dayPlayCount[key] = 0;
        }
      }

      // sorts the dayPlayCount
      const dayPlayCountArray = Object.entries(dayPlayCount)
        .sort((x, y) => (x[0] > y[0] ? 1 : -1));

      // Replace each days total with the running total for this period
      let runningTotal: number = 0;
      const dayDataPoints = dayPlayCountArray.map((i) => {
        runningTotal += i[1];
        return {
          x: i[0],
          y: runningTotal,
        };
      });

      dayDataPoints.sort((x, y) => (x.x > y.x ? 1 : -1));

      data.push({
        id: artistName,
        data: dayDataPoints,
      });
    });

  // At this point we have an array of
  // {
  //     "id": "Pink Floyd",
  //     "data": [{x: 12/28, y: 4}, {x: 12/29, y: 8}]
  // }
  // Now we need instead of the running play count, the ranking each day

  // Now create objects of rankings like...
  // Index of artist +1 is ranking that day
  // {
  //     "12/28": ['Pink Floyd', 'AFI']
  // }
  const dayRanks = {};
  for (let d = new Date(oldest); d <= newest; d.setDate(d.getDate() + 1)) {
    const key = `${d.getMonth() + 1}/${(`0${d.getDate()}`).slice(-2)}/${d.getFullYear()}`;

    const dateData = data.map((obj) => {
      const keep = obj.data.filter((x) => x.x === key);
      return {
        id: obj.id,
        data: keep,
      };
    });

    const r = dateData.sort((x, y) => {
      if (x.data.length === 0) { return 1; }
      if (y.data.length === 0) { return -1; }
      if (x.data[0].y > y.data[0].y) { return -1; }

      return 1;
    }).map((i) => i.id);

    dayRanks[key] = r;
  }

  const newData = data.map((d) => {
    const newd = d.data.map((dat) => ({
      x: dat.x.slice(0, -5),
      y: dayRanks[dat.x].indexOf(d.id) + 1,
    }));

    return {
      id: d.id,
      data: newd,
    };
  });

  const theme = {
    textColor: '#eee',
    axis: {
      domain: {
        line: {
          stroke: 'red',
        },
      },
    },
  };

  return (

    <div className="column is-full has-text-centered">
      <div style={{ height: '350px', fontWeight: 'bold' }}>
        <span style={{ color: '#eee' }}>
          Artist Rank By Day
        </span>
        <ResponsiveBump
          data={newData}
          yOuterPadding={-50}
          // lineWidth={4}
          // activeLineWidth={6}
          pointSize={12}
          activePointSize={16}
          theme={theme}
          colors={{ scheme: 'accent' }}
          inactivePointSize={8}
          margin={{
            top: 50, right: 150, left: 50, bottom: 75,
          }}
          axisTop={{
            tickRotation: -75,
          }}
          axisBottom={{
            tickSize: 5,
            tickRotation: -75,
          }}
          axisLeft={{
            tickSize: 5,
            legend: 'Ranking',
            legendOffset: -35,
            legendPosition: 'middle',
          }}
        />
      </div>
    </div>
  );
}
