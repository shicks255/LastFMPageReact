import React from 'react';
import { ResponsiveLine } from '@nivo/line';
import { Track } from '../../types/Track';
import { chartColors } from '../../utils';

type Props = {
  recentTracks: Track[]
}

const LineGraph: React.FC<Props> = ((props: Props): JSX.Element => {
  function trimName(name) {
    if (name.length > 20) { return `${name.slice(0, 20)}...`; }
    return name;
  }

  const { recentTracks } = props;

  const oneMonthAgo = new Date(recentTracks[0].date.uts * 1000);
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 2);
  const oneMonthAgoTimestamp = Math.floor(oneMonthAgo.valueOf() / 1000);

  const topArtistsFromTracks: {[key: string]: number} = recentTracks
    .filter((x) => x.date.uts >= oneMonthAgoTimestamp)
    .reduce((accum, curr) => {
      if (Object.prototype.hasOwnProperty.call(accum, (curr.artist['#text']))) {
        accum[curr.artist['#text']] += 1;
      } else {
        accum[curr.artist['#text']] = 1;
      }

      return accum;
    }, {});

  const d = Object.entries(topArtistsFromTracks).sort((x, y) => (x[1] > y[1] ? 1 : -1))
    .reverse()
    .map((x) => x[0])
    .slice(0, 10);

  // return 'artistName': [playDates]
  const tracksByArtist = recentTracks
    .filter((x) => d.includes(x.artist['#text']))
    .filter((x) => x.date.uts >= oneMonthAgoTimestamp)
    .reduce((accum, curr) => {
      if (curr.date) {
        if (Object.prototype.hasOwnProperty.call(accum, curr.artist['#text'])) {
          accum[curr.artist['#text']].push(curr.date.uts);
        } else {
          const tracks: number[] = [];
          tracks.push(curr.date.uts);
          // eslint-disable-next-line no-param-reassign
          accum[curr.artist['#text']] = tracks;
        }
      }
      return accum;
    }, {});

  const ld: {id: string, color: string, data: {x: string, y: number}[]}[] = [];

  Object.keys(tracksByArtist).forEach((artistName) => {
    const artistAndPlayCounts = tracksByArtist[artistName];
    tracksByArtist[artistName] = artistAndPlayCounts.map((i) => new Date(i * 1000).toLocaleDateString('en-US'));

    const artistPlayCount:
        {[key: string]: number} = tracksByArtist[artistName].reduce((accum, date) => {
          if (accum && Object.prototype.hasOwnProperty.call(accum, date)) {
            accum[date] += 1;
          } else {
            accum[date] = 1;
          }

          return accum;
        }, {});

    tracksByArtist[artistName] = artistPlayCount;

    const trackData = Object.entries(artistPlayCount).map((k) => ({
      x: k[0],
      y: k[1],
    }));

    const data = {
      id: artistName,
      color: 'hsl(333, 70%, 40%)',
      data: trackData,
    };

    ld.push(data);
  });

  const theme = {
    textColor: '#eee',
    axis: {
      domain: {
        line: {
          stroke: '#eee',
        },
      },
    },
  };

  return (
    <div className="column is-full has-text-centered">
      <div style={{ height: '350px', fontWeight: 'bold', minWidth: 0 }}>
        <section className="mainContent">
          <h1 className="title myTitle has-text-left-tablet noMarginBottom">Play Count By Day</h1>
          <h2 className="myTitle has-text-left-tablet leftPadding">
            (Using last 200 plays)
          </h2>
        </section>
        <ResponsiveLine
          data={ld}
          margin={{
            top: 50, right: 150, left: 50, bottom: 50,
          }}
          theme={theme}
          enableGridX={false}
          enableGridY={false}
          enableSlices="x"
          sliceTooltip={(e) => {
            const rows = e.slice.points
              .sort((x, y) => {
                if (x.data.y > y.data.y) { return -1; }
                return 1;
              })
              .map((p) => (
                <tr className="sliceTooltipTable" key={p.id}>
                  <td style={{ color: p.serieColor }}>
                    {trimName(p.serieId)}
                  </td>
                  <td>{p.data.y}</td>
                </tr>
              ));

            return (
              <table>
                <tbody>
                  {rows}
                </tbody>
              </table>
            );
          }}
          isInteractive
          colors={chartColors}
          lineWidth={3}
          pointSize={10}
          xScale={{
            type: 'time',
            format: '%m/%d/%Y',
            useUTC: false,
            precision: 'day',
            stacked: true,
          }}
          xFormat="time:%m/%d/%Y"
          yScale={{
            type: 'linear',
            min: 0,
            max: 30,
          }}
          axisLeft={{
            legend: 'Listens',
            legendOffset: -35,
            legendPosition: 'middle',
          }}
          axisBottom={{
            format: '%b %d',
            tickValues: 'every 1 day',
            tickRotation: -75,
          }}
          legends={[
            {
              anchor: 'right',
              direction: 'column',
              justify: false,
              translateX: 125,
              itemWidth: 100,
              itemHeight: 20,
              itemsSpacing: 4,
              itemTextColor: '#999',
            },
          ]}
        />
      </div>
    </div>
  );
});

export default LineGraph;
