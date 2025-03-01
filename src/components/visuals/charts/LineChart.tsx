/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-use-before-define */
// @ts-nocheck
import React from 'react';

import { Theme } from '@nivo/core';
import { LineProps, ResponsiveLine } from '@nivo/line';

import { cColors, formatNumber, trimString } from '../../../utils';
import NoData from '../../common/NoData';

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
  },
  legends: [
    {
      anchor: 'top-right',
      direction: 'column',
      justify: false,
      translateX: 90,
      translateY: -10,
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

interface IProps {
  chartData: ILineChartObject[];
  timeFrame: string;
  options?: Partial<LineProps>;
}

interface ILineChartObject {
  data: ILineChartData[];
  id: string;
  total: number;
}

interface ILineChartData {
  x: string;
  y: number;
}

const LineChart: React.FC<IProps> = ({ chartData, timeFrame, options }: IProps) => {
  let format = '%Y-%m-%d';
  let precision: 'day' | 'month' | 'year' = 'day';
  let tickValues = 'every 1 day';
  let bottomXFormat = '%b %d';

  if (timeFrame === '7day') {
    bottomXFormat = '%b %d';
    format = '%Y-%m-%d';
    precision = 'day';
    tickValues = 'every 1 day';
  }

  if (timeFrame === '1month') {
    bottomXFormat = '%b %d';
    format = '%Y-%m-%d';
    precision = 'day';
    tickValues = 'every 3 days';
  }

  if (timeFrame === '6month') {
    bottomXFormat = '%b %Y';
    format = '%Y-%m';
    precision = 'month';
    tickValues = 'every 1 month';
  }

  if (timeFrame === '12month' || timeFrame === '1year') {
    bottomXFormat = '%b %Y';
    format = '%Y-%m';
    precision = 'month';
    tickValues = 'every 1 month';
  }

  if (timeFrame === '2year') {
    bottomXFormat = '%b %Y';
    format = '%Y-%m';
    precision = 'month';
    tickValues = 'every 3 month';
  }

  if (timeFrame === '3year') {
    bottomXFormat = '%b %Y';
    format = '%Y-%m';
    precision = 'month';
    tickValues = 'every 4 month';
  }

  if (timeFrame === '5year') {
    bottomXFormat = '%Y';
    format = '%Y';
    precision = 'year';
    tickValues = 'every 1 year';
  }

  if (timeFrame === '10year') {
    bottomXFormat = '%Y';
    format = '%Y';
    precision = 'year';
    tickValues = 'every 1 year';
  }

  if (timeFrame === '15year') {
    bottomXFormat = '%Y';
    format = '%Y';
    precision = 'year';
    tickValues = 'every 1 year';
  }

  if (timeFrame === 'overall') {
    bottomXFormat = '%Y';
    format = '%Y';
    precision = 'year';
    tickValues = 'every 1 year';
  }

  if (timeFrame === 'overall' && chartData.length > 20) {
    tickValues = 'every 2 year';
  }

  let xScale: IScaleType = {
    type: 'time',
    format,
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

  if (chartData.length === 0) {
    return <NoData />;
  }

  return (
    <ResponsiveLine
      {...commonGraphProps}
      data={chartData}
      xScale={xScale}
      axisBottom={axisBottom}
      pointLabelYOffset={0}
      axisLeft={{
        format: (val) => formatNumber(val)
      }}
      {...options}
    />
  );
};

export default LineChart;
