/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useContext, useState } from 'react';

import { Theme } from '@nivo/core';
import { LineProps, ResponsiveLine } from '@nivo/line';

import { getDateRangeFromTimeFrame, getTimeGroupFromTimeFrame, trimString } from '../../utils';
import Loader from '../common/Loader';
import TimeFrameSelect from '../common/TimeFrameSelect';
import { LocalStateContext } from '@/contexts/LocalStateContext';
import useScrobblesArtistOrAlbumGrouped from '@/hooks/api/musicApi/useScrobblesArtistOrAlbumGrouped';

const theme: Theme = {
  textColor: '#212020',
  axis: {
    domain: {
      line: {
        stroke: '#968f8f'
      }
    }
  }
};

const commonGraphProps: LineProps = {
  data: [],
  margin: {
    top: 25,
    right: 105,
    left: 37,
    bottom: 115
  },
  theme: theme,
  enableGridX: true,
  enableGridY: true,
  enableSlices: 'x',
  sliceTooltip: (e) => {
    const rows = e.slice.points
      .filter((v) => v.data.y > 0)
      .sort((x, y) => {
        if (x.data.y > y.data.y) {
          return -1;
        }
        return 1;
      })
      .map((p, index) => (
        <tr key={p.id} className={`${index % 2 == 0 ? 'bg-slate-300' : 'bg-gray-200'} pl-2 pr-2`}>
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
  },
  isInteractive: true,
  // colors={chartColors}
  colors: { scheme: 'dark2' },
  lineWidth: 3,
  pointSize: 10,
  yScale: {
    type: 'linear',
    min: 0
  },
  legends: [
    {
      anchor: 'top-right',
      direction: 'column',
      justify: false,
      translateX: 90,
      translateY: -20,
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
            itemOpacity: 1,
            symbolSize: 25
          }
        }
      ]
    }
  ]
};

const LineGraph: React.FC = () => {
  const { state } = useContext(LocalStateContext);
  const [resourceType, setResourceType] = useState<string>('artist');
  const [timeFrame, setTimeFrame] = useState('7day');

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

  let format1 = '%Y-%m-%d';
  let precision: 'day' | 'month' | 'year' = 'day';
  let tickValues = 'every 1 day';
  let bottomXFormat = '%b %d';

  if (timeFrame === '7day' || timeFrame === '1month') bottomXFormat = '%b %d';
  if (timeFrame === '6month' || timeFrame === '12month') bottomXFormat = '%b %Y';
  if (timeFrame === '1year' || timeFrame === 'overall') bottomXFormat = '%Y';

  if (timeFrame === '7day' || timeFrame === '1month') format1 = '%Y-%m-%d';
  if (timeFrame === '6month' || timeFrame === '12month') format1 = '%Y-%m';
  if (timeFrame === '1year' || timeFrame === 'overall') format1 = '%Y';

  if (timeFrame === '7day' || timeFrame === '1month') precision = 'day';
  if (timeFrame === '6month' || timeFrame === '12month') precision = 'month';
  if (timeFrame === '1year' || timeFrame === 'overall') precision = 'year';

  if (timeFrame === '7day' || timeFrame === '1month') tickValues = 'every 1 day';
  if (timeFrame === '6month' || timeFrame === '12month') tickValues = 'every 1 month';
  if (timeFrame === '1year' || timeFrame === 'overall') tickValues = 'every 1 year';

  if (!scrobbles || !scrobbles.data) {
    return <></>;
  }

  if (scrobbles.isLoading) {
    return <Loader small={false} />;
  }

  const sortedDates = scrobbles.data.data
    .flatMap((x) => x.data)
    .flatMap((x) => x.timeGroup)
    .sort();

  const oldest = sortedDates[0];
  const newest = sortedDates[sortedDates.length - 1];

  const chartNew = scrobbles.data.data
    .map((item) => {
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

      if (!dd.find((x) => x.x === oldest)) {
        dd.unshift({ x: oldest, y: 0 });
      }
      if (!dd.find((x) => x.x === newest)) {
        dd.push({ x: newest, y: 0 });
      }

      const totals = dd.reduce((prev, curr) => {
        return prev + curr.y;
      }, 0);

      return {
        id,
        total: totals,
        data: dd
      };
    })
    .sort((item1, item2) => {
      if (item1.total > item2.total) {
        return 1;
      }

      return -1;
    });

  return (
    <div>
      <div className="p-0 lg:p-2" style={{ height: '500px', fontWeight: 'bold', minWidth: 0 }}>
        <section>
          <TimeFrameSelect value={timeFrame} onChange={(e: string) => setTimeFrame(e)} />
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
        {timeFrame === '3month' ? (
          <PointGraph chartNew={chartNew} />
        ) : (
          <ResponsiveLine
            {...commonGraphProps}
            data={chartNew}
            xScale={{
              type: 'time',
              format: format1,
              useUTC: false,
              precision
            }}
            axisBottom={{
              format: bottomXFormat,
              tickValues,
              tickRotation: -75
            }}
          />
        )}
      </div>
    </div>
  );
};

interface IPointGraphProps {
  chartNew: {
    id: string;
    data: {
      x: string;
      y: number;
    }[];
  }[];
}

/**
 * The week (IW) iso format is not supported by Nivo and messes everything up,
 * So making a component just for that use case.
 */
const PointGraph: React.FC<IPointGraphProps> = (props) => {
  const { chartNew } = props;

  return (
    <ResponsiveLine
      {...commonGraphProps}
      data={chartNew}
      xScale={{
        type: 'point'
      }}
      axisBottom={{
        tickRotation: -75,
        legend: 'Week of the Year',
        legendPosition: 'middle',
        legendOffset: 65
      }}
    />
  );
};

export default LineGraph;
