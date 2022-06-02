import React, { useContext, useEffect, useState } from 'react';

import { ResponsiveLine } from '@nivo/line';

import {
  chartColors,
  getDateRangeFromTimeFrame,
  getTimeGroupFromTimeFrame,
  trimString
} from '../../utils';
import Loader from '../common/Loader';
import TimeFrameSelect from '../common/TimeFrameSelect';
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
    <div>
      <div className="p-0 lg:p-2" style={{ height: '500px', fontWeight: 'bold', minWidth: 0 }}>
        <section>
          <TimeFrameSelect onChange={(e: string) => setTimeFrame(e)} />
          <br />
          <br />
          <select
            className="px-3 py-1.5 md:w-32 w-full
                    rounded border border-solid
                    border-gray-300 transition ease-in-out bg-white"
            value={resourceType}
            onChange={(e) => setResourceType(e.target.value)}
          >
            <option value="album" key="album">
              Albums
            </option>
            <option value="artist" key="artist">
              Artists
            </option>
          </select>
          <div className="text-left text-2xl font-semibold pl-4">Plays Line Chart</div>
        </section>
        <ResponsiveLine
          data={chartNew}
          margin={{
            top: 25,
            right: 105,
            left: 50,
            bottom: 115
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
              .map((p, index) => (
                <tr
                  key={p.id}
                  className={`${index % 2 == 0 ? 'bg-slate-300' : 'bg-gray-200'} pl-2 pr-2`}
                >
                  <td style={{ color: p.serieColor }} className="pl-4">
                    {trimString(p.serieId.toString(), 45)}
                  </td>
                  <td className="pr-4 pl-2 text-right">{p.data.y}</td>
                </tr>
              ));

            return (
              <table>
                <tbody className="rounded-lg p-4 even:bg-slate-300 odd:bg-gray-200">{rows}</tbody>
              </table>
            );
          }}
          isInteractive
          // colors={chartColors}
          colors={{ scheme: 'dark2' }}
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
            legend: 'Plays',
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
              translateX: 90,
              translateY: -25,
              itemWidth: 100,
              itemHeight: 15,
              itemsSpacing: 4,
              itemTextColor: 'rgb(12 74 110)',
              itemDirection: 'right-to-left',
              symbolSize: 10,
              symbolShape: 'circle',
              effects: [
                {
                  on: 'hover',
                  style: {
                    // itemBackground: 'red',
                    itemOpacity: 1,
                    symbolSize: 25
                  }
                }
              ],
              onMouseEnter: () => {
                console.log('hi');
              }
            }
          ]}
        />
      </div>
    </div>
  );
};

export default LineGraph;
