import React, { useContext, useEffect, useState } from 'react';

import { ResponsiveLine } from '@nivo/line';

import {
  chartColors,
  getDateRangeFromTimeFrame,
  getTimeGroupFromTimeFrame,
  trimString
} from '../../utils';
import Loader from '../Loader';
import TimeFrameSelect from '../TimeFrameSelect';
import { LocalStateContext } from '@/contexts/LocalStateContext';
import useScrobblesArtistOrAlbumGrouped from '@/hooks/api/musicApi/useScrobblesArtistOrAlbumGrouped';

const LineGraph: React.FC<Record<string, void>> = (): JSX.Element => {
  const { state } = useContext(LocalStateContext);
  const [resourceType, setResourceType] = useState<string>('album');
  const [timeFrame, setTimeFrame] = useState('7day');
  const [format1, setFormat1] = useState('%Y-%m-%d');
  const [precision, setPrecision] = useState<'day' | 'month' | 'year'>('day');
  const [tickValues, setTickValues] = useState('every 1 day');
  const [bottomXFormat, setBottomXFormat] = useState('%b %d');

  const resource = resourceType === 'artist' ? 'artistsGrouped' : 'albumsGrouped';
  const [start, end] = getDateRangeFromTimeFrame(timeFrame);
  const timeGroup = getTimeGroupFromTimeFrame(timeFrame);
  const scrobbles = useScrobblesArtistOrAlbumGrouped(
    resource,
    state.userName,
    timeGroup,
    start,
    end,
    12
  );

  useEffect(() => {
    if (timeFrame === '7day' || timeFrame === '1month') setBottomXFormat('%b %d');
    if (timeFrame === '3month') setBottomXFormat('%b %Y');
    if (timeFrame === '6month' || timeFrame === '12month') setBottomXFormat('%b %Y');
    if (timeFrame === '1year' || timeFrame === 'overall') setBottomXFormat('%Y');

    if (timeFrame === '7day' || timeFrame === '1month') setFormat1('%Y-%m-%d');
    if (timeFrame === '3month') setFormat1('%Y-%m');
    if (timeFrame === '6month' || timeFrame === '12month') setFormat1('%Y-%m');
    if (timeFrame === '1year' || timeFrame === 'overall') setFormat1('%Y');

    if (timeFrame === '7day' || timeFrame === '1month') setPrecision('day');
    if (timeFrame === '3month') setPrecision('month');
    if (timeFrame === '6month' || timeFrame === '12month') setPrecision('month');
    if (timeFrame === '1year' || timeFrame === 'overall') setPrecision('year');

    if (timeFrame === '7day' || timeFrame === '1month') setTickValues('every 1 day');
    if (timeFrame === '3month') setTickValues('every 1 month');
    if (timeFrame === '6month' || timeFrame === '12month') setTickValues('every 1 month');
    if (timeFrame === '1year' || timeFrame === 'overall') setTickValues('every 1 year');
  }, [timeFrame, resourceType]);

  if (!scrobbles || !scrobbles.data) {
    return <></>;
  }

  if (scrobbles.isLoading) {
    return <Loader small={false} />;
  }

  const chartNew = scrobbles.data.data.map((item) => {
    const id =
      resourceType === 'artist'
        ? trimString(item.artistName, 35)
        : trimString(item.albumName || '', 35);
    const dataPoints = item.data;

    const dd = dataPoints
      .sort((dp1, dp2) => {
        if (dp1.timeGroup > dp2.timeGroup) return 1;
        return -1;
      })
      .map((dp) => ({
        x: dp.timeGroup,
        y: dp.plays
      }));

    return {
      id,
      data: dd
    };
  });

  const theme = {
    textColor: '#212020',
    axis: {
      domain: {
        line: {
          stroke: '#968f8f'
        }
      }
    }
  };

  return (
    <div className="column is-full has-text-centered">
      <div style={{ height: '350px', fontWeight: 'bold', minWidth: 0 }}>
        <section>
          <TimeFrameSelect onChange={(e: string) => setTimeFrame(e)} />
          <select value={resourceType} onChange={(e) => setResourceType(e.target.value)}>
            <option value="album" key="album">
              Albums
            </option>
            <option value="artist" key="artist">
              Artists
            </option>
          </select>
          <h1 className="title myTitle has-text-left-tablet noMarginBottom">Plays Line Chart</h1>
        </section>
        <ResponsiveLine
          data={chartNew}
          margin={{
            top: 25,
            right: 175,
            left: 50,
            bottom: 75
          }}
          theme={theme}
          enableGridX={false}
          enableGridY={false}
          enableSlices="x"
          sliceTooltip={(e) => {
            const rows = e.slice.points
              .filter((v) => v.data.y > 0)
              .sort((x, y) => {
                if (x.data.y > y.data.y) {
                  return -1;
                }
                return 1;
              })
              .map((p) => (
                <tr className="bg-pink-200" key={p.id}>
                  <td style={{ color: p.serieColor }}>{trimString(p.serieId.toString(), 45)}</td>
                  <td>{p.data.y}</td>
                </tr>
              ));

            return (
              <table>
                <tbody>{rows}</tbody>
              </table>
            );
          }}
          isInteractive
          colors={chartColors}
          lineWidth={3}
          pointSize={10}
          xScale={{
            type: 'time',
            format: format1,
            useUTC: false,
            precision
            // stacked: true
          }}
          // xFormat="time:%m/%d/%Y"
          yScale={{
            type: 'linear',
            min: 0
            // max: 30,
          }}
          axisLeft={{
            legend: 'Listens',
            legendOffset: -40,
            legendPosition: 'middle'
          }}
          axisBottom={{
            format: bottomXFormat,
            tickValues,
            tickRotation: -75
          }}
          legends={[
            {
              anchor: 'top-right',
              direction: 'column',
              justify: false,
              translateX: 105,
              translateY: -25,
              itemWidth: 100,
              itemHeight: 15,
              itemsSpacing: 4,
              itemTextColor: '#999',
              symbolSize: 10,
              symbolShape: 'circle'
            }
          ]}
        />
      </div>
    </div>
  );
};

export default LineGraph;
