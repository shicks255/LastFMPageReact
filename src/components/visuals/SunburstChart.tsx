import React, { useContext, useEffect, useState } from 'react';
import { ResponsiveSunburst } from '@nivo/sunburst';
import { chartColors, getDateRangeFromTimeFrame } from '../../utils';
import { LocalStateContext } from '../../contexts/LocalStateContext';
import TimeFrameSelect from '../TimeFrameSelect';

const SunburstChart: React.FC<Record<string, void>> = ((): JSX.Element => {
  const { state } = useContext(LocalStateContext);
  const [trackz, setTrackz] = useState(undefined);
  const [timeFrame, setTimeFrame] = useState('7day');
  // const [loading, setLoading] = useState(false);

  // if (loading) return <></>;

  useEffect(() => {
    // setLoading(true);
    const [start, end] = getDateRangeFromTimeFrame(timeFrame);

    fetch(`https://musicapi.shicks255.com/api/v1/scrobbles/albumsGrouped?userName=${state.userName}&from=${start}&to=${end}&timeGroup=DAY&limit=50`)
      .then((res) => res.json())
      .then((res) => {
        setTrackz(res);
        // setLoading(false);
      });
  }, [timeFrame]);

  if (!trackz) {
    return <></>;
  }

  const t = {};

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  trackz.data.forEach((item) => {
    const id = item.artistName;
    if (Object.prototype.hasOwnProperty.call(t, id)) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const th = t[id];
      const album = item.albumName;
      const { plays } = item.data[0];
      const newTh = {
        id: album,
        value: plays,
      };
      th.push(newTh);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      t[id] = th;
    } else {
      const album = item.albumName;
      const { total } = item;
      const newTh = {
        id: album,
        value: total,
      };
      const children = [newTh];
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      t[id] = children;
    }
  });

  const pp = Object.entries(t).map((k) => ({
    id: k[0],
    children: k[1],
  }));

  const data = {
    id: 'albums',
    color: '#a32929',
    children: pp,
  };

  return (
    <div className="column is-full has-text-centered">
      <div style={{ height: '500px', fontWeight: 'bold' }}>
        <section className="mainContent">
          <h1 className="title myTitle has-text-left-tablet noMarginBottom">Album Pie Chart</h1>
          <TimeFrameSelect
            timeFrameSelected={timeFrame}
            onChange={(e: string) => setTimeFrame(e)}
          />
        </section>
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
