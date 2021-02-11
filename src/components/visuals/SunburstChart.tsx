import React from 'react';
import { ResponsiveSunburst } from '@nivo/sunburst';
import { Track } from '../../types/Track';
import { chartColors } from '../../utils';

type Props = {
  recentTracks: Track[]
}

const SunburstChart: React.FC<Props> = ((props: Props): JSX.Element => {
  const { recentTracks } = props;

  const d: {[key: string]: number} = recentTracks.reduce((accum, item) => {
    const artistName = item.artist['#text'];
    const albumName = item.album['#text'];

    if (Object.prototype.hasOwnProperty.call(accum, artistName)) {
      if (Object.prototype.hasOwnProperty.call(accum[artistName], albumName)) {
        accum[artistName][albumName] += 1;
      } else {
        accum[artistName][albumName] = 1;
      }
    } else {
      accum[artistName] = {
        [albumName]: 1,
      };
    }
    return accum;
  }, {});

  const dp = Object.entries(d)
    .sort((x, y) => {
      const xCount = Object.values(x[1]).reduce((accum, cur) => accum + cur, 0);
      const yCount = Object.values(y[1]).reduce((accum, cur) => accum + cur, 0);

      return xCount > yCount ? -1 : 1;
    })
    .slice(0, 20)
    .map((k) => {
      const albumData = Object.entries(k[1]).map((i) => ({
        id: i[0],
        // id: `${k[0]} - ${i[0]}`,
        value: i[1],
      }));

      return {
        id: k[0],
        children: albumData,
      };
    });

  const data = {
    id: 'albums',
    color: '#a32929',
    children: dp,
  };

  return (
    <div className="column is-full has-text-centered">
      <div style={{ height: '500px', fontWeight: 'bold' }}>
        <span style={{ color: '#eee' }}>
          Recent Tracks Album Pie Chart
        </span>
        <ResponsiveSunburst
          data={data}
          margin={{ top: 15, bottom: 20 }}
          colors={chartColors}
          borderColor="#4E4E50"
          cornerRadius={3}
          borderWidth={4}
          isInteractive
        />
      </div>
    </div>
  );
});

export default SunburstChart;