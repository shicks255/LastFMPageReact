import React, { useContext, useState } from 'react';

import { ResponsiveSunburst } from '@nivo/sunburst';

import { chartColors, getDateRangeFromTimeFrame, trimString } from '../../utils';
import Loader from '../Loader';
import TimeFrameSelect from '../TimeFrameSelect';
import { LocalStateContext } from '@/contexts/LocalStateContext';
import useScrobblesArtistOrAlbumGrouped from '@/hooks/api/musicApi/useScrobblesArtistOrAlbumGrouped';

const SunburstChart: React.FC<Record<string, void>> = (): JSX.Element => {
  const { state } = useContext(LocalStateContext);
  const [timeFrame, setTimeFrame] = useState('7day');

  const [start, end] = getDateRangeFromTimeFrame(timeFrame);
  const scrobbles = useScrobblesArtistOrAlbumGrouped(
    'albumsGrouped',
    state.userName,
    'DAY',
    start,
    end,
    50
  );

  if (!scrobbles || !scrobbles.data) {
    return <></>;
  }

  if (scrobbles.isLoading) {
    return <Loader small={false} />;
  }

  const t = {};

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
    colorMap[k[0]] = chartColors[index];
    return {
      id: k[0],
      color: chartColors[index],
      children: k[1]
    };
  });

  const data = {
    id: 'albums',
    color: '#a32929',
    children: pp
  };

  const artists = data.children.map((k) => k.id);

  return (
    <div className="column is-full has-text-centered">
      <div className="relative" style={{ height: '500px', fontWeight: 'bold' }}>
        <section className="mainContent">
          <h1 className="title myTitle has-text-left-tablet noMarginBottom">Album Pie Chart</h1>
          <TimeFrameSelect onChange={(e: string) => setTimeFrame(e)} />
        </section>
        <ResponsiveSunburst
          data={data}
          margin={{
            top: 15,
            bottom: 20,
            right: 150
          }}
          colors={chartColors}
          borderColor="#4E4E50"
          cornerRadius={3}
          borderWidth={4}
          isInteractive
        />
        <div className="absolute right-28 top-20">
          {artists.map((item) => (
            <div key={item} style={{ color: colorMap[item] }}>
              {trimString(item)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SunburstChart;
