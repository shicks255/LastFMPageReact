import React, { useContext, useState } from 'react';

import { ResponsiveSunburst } from '@nivo/sunburst';

import { cColors, getDateRangeFromTimeFrame, trimString } from '../../utils';
import Loader from '../common/Loader';
import TimeFrameSelect from '../common/TimeFrameSelect';
import { LocalStateContext } from '@/contexts/LocalStateContext';
import useScrobblesArtistOrAlbumGrouped from '@/hooks/api/musicApi/useScrobblesArtistOrAlbumGrouped';
import useIsMobile from '@/hooks/useIsMobile';

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
    12
  );

  const isMobile = useIsMobile();

  if (scrobbles.isLoading || !scrobbles || !scrobbles.data) {
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
    colorMap[k[0]] = cColors[index];
    return {
      id: k[0],
      color: cColors[index],
      children: k[1]
    };
  });

  console.log(colorMap);

  const data = {
    id: 'albums',
    color: '#a32929',
    children: pp
  };

  const artists = data.children.map((k) => k.id);

  return (
    <div>
      <div className="relative mt-4 pl-4 pr-4" style={{ height: '500px', fontWeight: 'bold' }}>
        <section>
          <div className="text-left text-2xl font-semibold">Album Pie Chart</div>
        </section>
        <TimeFrameSelect value={timeFrame} onChange={(e: string) => setTimeFrame(e)} />
        <ResponsiveSunburst
          data={data}
          margin={{
            top: 15,
            bottom: 20,
            right: 150
          }}
          colors={cColors}
          borderColor="#4E4E50"
          cornerRadius={3}
          borderWidth={4}
          isInteractive
          enableArcLabels={true}
        />
        <div className={`absolute top-52 ${isMobile ? 'right-2' : 'right-32'}`}>
          {artists.slice(0, 10).map((item) => (
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
