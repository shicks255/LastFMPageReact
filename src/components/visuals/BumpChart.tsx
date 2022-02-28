/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useContext, useState } from 'react';

import { ResponsiveBump } from '@nivo/bump';

import { getDateRangeFromTimeFrame, getTimeGroupFromTimeFrame } from '../../utils';
import Loader from '../Loader';
import TimeFrameSelect from '../TimeFrameSelect';
import { LocalStateContext } from '@/contexts/LocalStateContext';
import useScrobblesArtistOrAlbumGrouped from '@/hooks/api/musicApi/useScrobblesArtistOrAlbumGrouped';

const BumpChart: React.FC<Record<string, void>> = () => {
  const [timeFrame, setTimeFrame] = useState('7day');
  const [resourceType, setResourceType] = useState<string>('artist');
  const [start, end] = getDateRangeFromTimeFrame(timeFrame);
  const timeGroup = getTimeGroupFromTimeFrame(timeFrame);

  const { state } = useContext(LocalStateContext);

  const resource = resourceType === 'artist' ? 'artistsGrouped' : 'albumsGrouped';
  const scrobbles = useScrobblesArtistOrAlbumGrouped(
    resource,
    state.userName,
    timeGroup,
    start,
    end,
    12
  );

  if (!scrobbles || !scrobbles.data) {
    return <></>;
  }

  if (scrobbles.isLoading) {
    return <Loader small={false} />;
  }

  const countPerTimeGroup = scrobbles.data.data.map((result) => {
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
  const timeGroups = countPerTimeGroup[0].data.map((x) => x.timeGroup);
  timeGroups.forEach((tg) => {
    const dayRank: string[] = [];
    const itemsForDay = countPerTimeGroup
      .map((item) => {
        const dayPlay = item.data.filter((x) => x.timeGroup === tg);
        if (resourceType === 'artist') {
          return {
            name: item.artistName || '',
            plays: dayPlay[0].plays
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
      // @ts-ignore
      y: v.indexOf(artist) + 1
    }));

    return {
      id: artist,
      data: myRanks
    };
  });

  return (
    <div className="column is-full has-text-centered">
      <div style={{ height: '350px', fontWeight: 'bold' }}>
        <section className="mainContent">
          <TimeFrameSelect onChange={(e: string) => setTimeFrame(e)} />
          <select value={resourceType} onChange={(e) => setResourceType(e.target.value)}>
            <option value="album" key="album">
              Albums
            </option>
            <option value="artist" key="artist">
              Artists
            </option>
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
            top: 50,
            right: 150,
            left: 50,
            bottom: 75
          }}
          axisTop={{
            tickRotation: -75
          }}
          axisBottom={{
            tickSize: 5,
            tickRotation: -75
          }}
          axisLeft={{
            tickSize: 5,
            legend: 'Ranking',
            legendOffset: -35,
            legendPosition: 'middle'
          }}
        />
      </div>
    </div>
  );
};

export default BumpChart;
