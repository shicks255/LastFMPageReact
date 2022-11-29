/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';

import { ResponsiveBump } from '@nivo/bump';

import { cColors } from '../../../utils';

interface IProps {
  chartData: IBumpChartItem[];
}

interface IBumpChartItem {
  id: string;
  data: IBumpChartData[];
}

interface IBumpChartData {
  x: Record<string, unknown>;
  y: number;
}

const BumpChart: React.FC<IProps> = ({ chartData }: IProps) => {
  return (
    <ResponsiveBump
      // @ts-ignore
      data={chartData}
      pointSize={12}
      interpolation="smooth"
      activePointSize={16}
      inactivePointSize={8}
      colors={cColors}
      margin={{
        top: 100,
        right: 150,
        left: 50,
        bottom: 105
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
  );
};

export default BumpChart;
