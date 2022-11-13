import React, { useContext } from 'react';

import { Theme } from '@nivo/core';
import { ResponsiveLine } from '@nivo/line';

import { LocalStateContext } from '@/contexts/LocalStateContext';
import useScrobblesGrouped from '@/hooks/api/musicApi/useScrobblesGrouped';

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

const WeeklyScrobbleChart: React.FC = () => {
  const { state } = useContext(LocalStateContext);

  const chartData = useScrobblesGrouped(state.userName, 'DAY', '2022-11-05', '2022-11-12');

  if (!chartData.data || chartData.data.length === 0) {
    return null;
  }

  const newChart = chartData.data.map((obj) => {
    return {
      x: obj.timeGroup,
      y: obj.plays
    };
  });

  const finalChart = [
    {
      id: 'Plays',
      data: newChart
    }
  ];

  return (
    <div style={{ height: 100 }}>
      <ResponsiveLine
        margin={{
          top: 10,
          right: 15,
          left: 25,
          bottom: 50
        }}
        theme={theme}
        isInteractive={false}
        enableGridY={false}
        enableGridX={false}
        colors={['rgb(50,82,168']}
        lineWidth={2}
        pointSize={5}
        pointLabelYOffset={0}
        yScale={{
          type: 'linear',
          min: 0
        }}
        data={finalChart}
        axisLeft={{
          tickValues: 2
        }}
        axisBottom={{
          format: (value) => value.toString().substring(5)
        }}
      />
    </div>
  );
};

export default WeeklyScrobbleChart;
