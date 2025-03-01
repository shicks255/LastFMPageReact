import React, { useContext } from 'react';

import { getDateRangeFromTimeFrame } from 'utils';

import LineChart from './charts/LineChart';
import { LocalStateContext } from '@/contexts/LocalStateContext';
import useScrobblesGrouped from '@/hooks/api/musicApi/useScrobblesGrouped';
import useIsMobile from '@/hooks/useIsMobile';

const WeeklyScrobbleChart: React.FC = () => {
  const { state } = useContext(LocalStateContext);

  const isMobile = useIsMobile();

  const { start, end } = getDateRangeFromTimeFrame('7day');

  const scrobbles = useScrobblesGrouped(state.userName, 'DAY', start, end);

  if (!scrobbles.data || scrobbles.data.length === 0) {
    return null;
  }

  const chartData = scrobbles.data.map((obj) => {
    return {
      x: obj.timeGroup,
      y: obj.plays
    };
  });

  const finalChart = [
    {
      id: 'Plays',
      data: chartData,
      total: 0
    }
  ];

  return (
    <div
      className={`p-1 mb-4 bg-gray-200 max-w-5xl ${!isMobile ? 'rounded-lg' : ''}`}
      style={{ height: 100, fontWeight: 'bold' }}
    >
      <div className="pl-4">Last Week</div>
      <LineChart
        chartData={finalChart}
        timeFrame={'7day'}
        options={{
          margin: {
            top: 10,
            right: 15,
            left: 25,
            bottom: 50
          },
          lineWidth: 2,
          pointSize: 5,
          colors: ['rgb(50,82,168'],
          isInteractive: false,
          enableGridX: false,
          enableGridY: false,
          axisLeft: {
            tickValues: 2
          },
          axisBottom: {
            tickPadding: 8,
            tickValues: 'every 1 day',
            format: '%b %d'
          }
        }}
      />
    </div>
  );
};

export default WeeklyScrobbleChart;
