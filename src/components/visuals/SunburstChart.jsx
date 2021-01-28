import React from 'react';
import { ResponsiveSunburst } from 'nivo';
import Loader from '../Loader';

export default function SunburstChart(props) {
  const { recentTracksQuery } = props;

  if (recentTracksQuery.isLoading) return <Loader />;

  const recentTracks = recentTracksQuery.data.filter((x) => Object.prototype.hasOwnProperty.call(x, 'artist'));

  const d = recentTracks.reduce((accum, item) => {
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
                    // theme={theme}
          margin={{ top: 15, bottom: 20 }}
          borderWith={1}
          borderColor="#4E4E50"
          cornerRadius={3}
          borderWidth={4}
          motionConfig="gentle"
          isInteractive
        />
      </div>
    </div>
  );
}

SunburstChart.propTypes = {
  recentTracksQuery: {
    isLoading: Boolean,
    data: Array,
  },
};

SunburstChart.defaultProps = {
  recentTracksQuery: {
    isLoading: false,
    data: [],
  },
};
