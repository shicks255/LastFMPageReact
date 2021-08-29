/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, {
  useContext, useEffect, useState,
} from 'react';
import { ResponsiveBump } from '@nivo/bump';
import { getDateRangeFromTimeFrame, getTimeGroupFromTimeFrame } from '../../utils';
import { LocalStateContext } from '../../contexts/LocalStateContext';
import TimeFrameSelect from '../TimeFrameSelect';

// type ChartData = {
//   id: string,
//   data: DataPoint[]
// }
// type DataPoint = {
//   x: string,
//   y: number,
// }

const BumpChart: React.FC<Record<string, void>> = (() => {
  const { state } = useContext(LocalStateContext);
  const [timeFrame, setTimeFrame] = useState('7day');
  const [trackzz, setTrackzz] = useState(undefined);
  const [resourceType, setResourceType] = useState<string>('artist');
  const [loading, setLoading] = useState(false);

  const setTimeFrame2 = (e) => {
    setTrackzz(undefined);
    setTimeFrame(e);
  };

  if (loading) return <></>;

  useEffect(() => {
    setLoading(true);
    const [start, end] = getDateRangeFromTimeFrame(timeFrame);
    const timeGroup = getTimeGroupFromTimeFrame(timeFrame);

    const resource = resourceType === 'artist' ? 'artistsGrouped' : 'albumsGrouped';
    fetch(`https://musicapi.shicks255.com/api/v1/scrobbles/${resource}?userName=${state.userName}&from=${start}&to=${end}&timeGroup=${timeGroup}&limit=12&empties=true`)
      .then((res) => res.json())
      .then((res) => {
        setTrackzz(res);
        setLoading(false);
      });
  }, [timeFrame, resourceType]);

  if (!trackzz) {
    return <></>;
  }

  // @ts-ignore
  const aa = trackzz.data.map((result) => {
    const items = result.data;
    let runningTotal = 0;
    const nestedPlays = items.map((item) => {
      runningTotal += item.plays;
      return {
        plays: runningTotal,
        timeGroup: item.timeGroup,
      };
    });

    if (resourceType === 'artist') {
      return {
        artistName: result.artistName,
        data: nestedPlays,
      };
    }
    return {
      albumName: result.albumName,
      data: nestedPlays,
    };
  });

  const darRanks = {};
  const timeGroups = aa[0].data.map((x) => x.timeGroup);
  timeGroups.forEach((tg) => {
    const dayRank: string[] = [];
    const itemsForDay = aa.map((item) => {
      const dayPlay = item.data.filter((x) => x.timeGroup === tg);
      if (resourceType === 'artist') {
        return {
          name: item.artistName,
          plays: dayPlay[0].plays,
        };
      }
      return {
        name: item.albumName,
        plays: dayPlay[0].plays,
      };
    })
      .sort((item1, item2) => {
        if (item1.plays > item2.plays) return 1;
        return -1;
      });

    itemsForDay.sort((ifd1, ifd2) => {
      if (ifd1.plays > ifd2.plays) return 1;
      return -1;
    })
      .reverse()
      .forEach((d) => {
        dayRank.push(d.name);
      });

    darRanks[tg] = dayRank;
  });

  const artists = resourceType === 'artist'
  // @ts-ignore
    ? trackzz.data.map((x) => x.artistName)
  // @ts-ignore
    : trackzz.data.map((x) => x.albumName);
  const finalNewChart = artists.map((artist) => {
    const myRanks = Object.entries(darRanks).map(([k, v]) => ({
      x: k,
      // @ts-ignore
      y: v.indexOf(artist) + 1,
    }));

    return {
      id: artist,
      data: myRanks,
    };
  });

  return (
    <div className="column is-full has-text-centered">
      <div style={{ height: '350px', fontWeight: 'bold' }}>
        <section className="mainContent">
          <TimeFrameSelect
            timeFrameSelected={timeFrame}
            onChange={(e: string) => setTimeFrame2(e)}
          />
          <select onChange={(e) => setResourceType(e.target.value)}>
            <option value="album" key="album" selected={resourceType === 'album'}>Albums</option>
            <option value="artist" key="artist" selected={resourceType === 'artist'}>Artists</option>
          </select>
          <h1 className="title myTitle has-text-left-tablet noMarginBottom">Artist Rank By Day</h1>
        </section>
        <ResponsiveBump
        // @ts-ignore
          data={finalNewChart}
          // yOuterPadding={-50}
          pointSize={12}
          interpolation="smooth"
          activePointSize={16}
          inactivePointSize={8}
          // theme={theme}
          // colors={chartColors}
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
});

export default BumpChart;
