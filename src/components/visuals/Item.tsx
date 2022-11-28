// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useContext, useState } from 'react';

import { ResponsiveCalendar } from '@nivo/calendar';
import { Theme } from '@nivo/core';
import { LineProps, ResponsiveLine } from '@nivo/line';
import { ResponsivePie } from '@nivo/pie';
import {
  cColors,
  formatNumber,
  getDateRangeFromTimeFrame,
  getTimeGroupFromTimeFrame,
  trimString,
  years,
  generateChart,
  generateCalendarChart2,
  generatePieChart
} from 'utils';

import NoData from '../common/NoData';
import TimeFrameSelect from '../common/TimeFrameSelect';
import VisualTitle from './common/VisualTitle';
import { LocalStateContext } from '@/contexts/LocalStateContext';
import useScrobblesArtistOrAlbumGrouped from '@/hooks/api/musicApi/useScrobblesArtistOrAlbumGrouped';
import useSuggestArtist from '@/hooks/api/musicApi/useSuggestArtist';
import useIsMobile from '@/hooks/useIsMobile';

interface IScaleType {
  type: 'time' | 'point';
  format?: string;
  useUTC?: boolean;
  precision?: string;
}

interface IAxisBottomType {
  format?: string;
  tickValues?: string;
  tickRotation: number;
  legend?: string;
  legendPosition?: string;
  legendOffset?: number;
}

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
    right: 50,
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
      .map((p) => (
        <tr key={p.id} className={`pl-2 pr-2 bg-white`}>
          <td className="pl-2">
            <div style={{ backgroundColor: p.serieColor, width: 15, height: 15 }} className="" />
          </td>
          <td className="pl-1 text-sky-900">{trimString(p.serieId.toString(), 45)}:</td>
          <td className="pr-4 text-right">{formatNumber(p.data.y.toString())}</td>
        </tr>
      ));

    return (
      <table className="rounded-lg">
        <tbody className="rounded-xl p-4 even:bg-slate-300 odd:bg-gray-200">{rows}</tbody>
      </table>
    );
  },
  isInteractive: true,
  colors: cColors,
  // colors: { scheme: 'dark2' },
  lineWidth: 3,
  pointSize: 10,
  yScale: {
    type: 'linear',
    min: 0
  }
};

const ItemGraph = () => {
  const { state } = useContext(LocalStateContext);
  const [timeFrame, setTimeFrame] = useState('7day');
  const [start, end] = getDateRangeFromTimeFrame(timeFrame);
  const timeGroup = getTimeGroupFromTimeFrame(timeFrame);

  const [artist, setArtist] = useState<string | undefined>(undefined);

  const [search, setSearch] = useState('');

  const scrobbles = useScrobblesArtistOrAlbumGrouped(
    'artistsGrouped',
    state.userName,
    timeGroup,
    start,
    end,
    undefined,
    artist ? [artist] : undefined,
    !!artist
  );

  const [timeFrame2, setTimeFrame2] = useState(new Date().getFullYear().toString());
  const year = years[timeFrame2];
  //   const chartData2 = useScrobblesGrouped(state.userName, 'DAY', year[0], year[1]);
  const chartData2 = useScrobblesArtistOrAlbumGrouped(
    'artistsGrouped',
    state.userName,
    'DAY',
    year[0],
    year[1],
    undefined,
    artist ? [artist] : undefined,
    !!artist
  );

  const chartData3 = useScrobblesArtistOrAlbumGrouped(
    'albumsGrouped',
    state.userName,
    timeGroup,
    start,
    end,
    undefined,
    artist ? [artist] : undefined,
    !!artist
  );

  const chart3 = generatePieChart(chartData3);

  const isMobile = useIsMobile();

  const response = useSuggestArtist(state.userName, search);

  const chart2 = generateCalendarChart2(chartData2);

  const currentYear = new Date().getFullYear();
  const timeFrameSelects = Object.keys(years)
    .filter((year) => year <= `${currentYear}`)
    .map((key) => (
      <option value={key} key={key}>
        {key}
      </option>
    ));

  let format1 = '%Y-%m-%d';
  let precision: 'day' | 'month' | 'year' = 'day';
  let tickValues = 'every 1 day';
  let bottomXFormat = '%b %d';

  if (timeFrame === '7day' || timeFrame === '1month') bottomXFormat = '%b %d';
  if (
    timeFrame === '6month' ||
    timeFrame === '12month' ||
    timeFrame === '2year' ||
    timeFrame === '3year'
  )
    bottomXFormat = '%b %Y';
  if (timeFrame === '1year' || timeFrame === 'overall') bottomXFormat = '%Y';

  if (timeFrame === '7day' || timeFrame === '1month') format1 = '%Y-%m-%d';
  if (timeFrame === '6month' || timeFrame === '12month' || timeFrame === '2year') format1 = '%Y-%m';
  if (timeFrame === '3year' || timeFrame === 'overall') format1 = '%Y';

  if (timeFrame === '7day' || timeFrame === '1month') precision = 'day';
  if (timeFrame === '6month' || timeFrame === '12month' || timeFrame === '2year')
    precision = 'month';
  if (timeFrame === '3year' || timeFrame === 'overall') precision = 'year';

  if (timeFrame === '7day') tickValues = 'every 1 day';
  if (timeFrame === '1month') tickValues = 'every 3 days';
  if (timeFrame === '6month' || timeFrame === '12month') {
    tickValues = 'every 1 month';
  }

  if (timeFrame === '2year') {
    tickValues = 'every 3 month';
  }
  if (timeFrame === '3year' || timeFrame === 'overall') tickValues = 'every 1 year';

  //   if (timeFrame === 'overall' && scrobbles?.data?.data?.length > 20) {
  //     tickValues = 'every 2 year';
  //   }

  let xScale: IScaleType = {
    type: 'time',
    format: format1,
    useUTC: false,
    precision
  };

  let axisBottom: IAxisBottomType = {
    format: bottomXFormat,
    tickValues,
    tickRotation: -75
  };

  if (timeFrame === '3month') {
    xScale = { type: 'point' };

    axisBottom = {
      tickRotation: -75,
      legend: 'Week of the Year',
      legendPosition: 'middle',
      legendOffset: 65
    };
  }

  const chartData = generateChart(scrobbles, timeFrame, 'artist');
  console.log(chartData);

  const handleClick = (item: string) => {
    setArtist(item);
    setSearch('');
  };

  const boxHeight = isMobile ? '900px' : '350px';

  const margin = {
    top: 30,
    bottom: 25,
    right: 50,
    left: 50
  };

  const mobileMargin = {
    top: 30,
    bottom: 25,
    right: 150,
    left: 150
  };

  return (
    <>
      <div>
        <div className="bg-gray-200 p-4">
          <input onChange={(e) => setSearch(e.target.value)} placeholder="Artist" value={search} />
          <br />
          {response.data?.map((item) => {
            return (
              <div
                key={item}
                className="cursor-pointer hover:bg-slate-300"
                onClick={() => handleClick(item)}
              >
                {item}
                <br />
              </div>
            );
          })}
        </div>
        {!artist && <>Select an artist</>}
        {artist && (
          <>
            <div className="mb-12 mt-4 pl-4 pr-4" style={{ height: '500px', fontWeight: 'bold' }}>
              <VisualTitle title={`${artist} Scrobbles`} />
              <TimeFrameSelect value={timeFrame} onChange={(e: string) => setTimeFrame(e)} />
              {chartData.length === 0 && <NoData />}
              {chartData && (
                <ResponsiveLine
                  {...commonGraphProps}
                  data={chartData}
                  xScale={xScale}
                  axisBottom={axisBottom}
                  pointLabelYOffset={0}
                  axisLeft={{
                    format: (val) => formatNumber(val)
                  }}
                />
              )}
            </div>
            <div
              className="relative mt-4 pl-4 pr-4"
              style={{ height: '500px', fontWeight: 'bold' }}
            >
              <VisualTitle title="Album Pie Chart" />
              <ResponsivePie
                data={chart3}
                margin={isMobile ? mobileMargin : margin}
                colors={cColors}
                animate
                activeOuterRadiusOffset={8}
                arcLinkLabelsColor={{
                  from: 'color'
                }}
              />
            </div>
            <div>
              <div
                className="mb-12 mt-32 pl-4 pr-4"
                style={{ height: boxHeight, fontWeight: 'bold' }}
              >
                <VisualTitle title="Scrobble Calendar" />
                <div>
                  <div>
                    <select
                      className="px-3 py-1.5 md:w-32 w-full
                rounded border border-solid
                border-gray-300 transition ease-in-out bg-white"
                      value={timeFrame2}
                      onChange={(event) => setTimeFrame2(event.target.value)}
                    >
                      {timeFrameSelects}
                    </select>
                  </div>
                </div>
                {chart2 && (
                  <ResponsiveCalendar
                    data={chart2}
                    from={year[2]}
                    to={year[1]}
                    margin={{
                      top: isMobile ? 25 : 0,
                      right: 0,
                      bottom: 0,
                      left: 15
                    }}
                    direction={isMobile ? 'vertical' : 'horizontal'}
                    emptyColor="#ffffff"
                    //   yearSpacing={40}
                    //   monthSpacing={4}
                    monthBorderColor="#ffffff"
                    maxValue={75}
                    dayBorderWidth={2}
                    dayBorderColor="#ffffff"
                    yearLegendPosition="before"
                    yearLegendOffset={6}
                    legends={[
                      {
                        anchor: 'top-left',
                        direction: isMobile ? 'column' : 'row',
                        translateY: 25,
                        translateX: isMobile ? 10 : 0,
                        itemCount: 4,
                        itemWidth: 42,
                        itemHeight: 36,
                        itemsSpacing: 14,
                        itemDirection: isMobile ? 'top-to-bottom' : 'right-to-left'
                      }
                    ]}
                  />
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ItemGraph;
