import React, { useContext } from 'react';

import { formatNumber } from 'utils';

import Loader from '../common/Loader';
import LineChart from './charts/LineChart';
import VisualTitle from './common/VisualTitle';
import { LocalStateContext } from '@/contexts/LocalStateContext';
import useScrobbleTotals from '@/hooks/api/musicApi/useScrobbleTotals';

const Totals: React.FC = () => {
  const { state } = useContext(LocalStateContext);

  const scrobbles = useScrobbleTotals(state.userName, 'YEAR');

  if (scrobbles.isLoading || !scrobbles || !scrobbles.data) {
    return <Loader />;
  }

  const chart = scrobbles.data.data.map((obj) => {
    return {
      x: `${obj.timeGroup}-01-01`,
      y: obj.count
    };
  });

  const finalChart = [
    {
      id: 'Plays',
      data: chart,
      total: 0
    }
  ];

  let tickValues = 'every 1 years';
  if (scrobbles.data.data.length > 10) {
    tickValues = 'every 2 years';
  }

  return (
    <div>
      <div className="mb-12 mt-4 pl-4 pr-4" style={{ height: '500px', fontWeight: 'bold' }}>
        <VisualTitle title="Running Scrobbles Total" />
        <LineChart
          chartData={finalChart}
          timeFrame={'overall'}
          options={{
            margin: {
              top: 10,
              right: 25,
              left: 75,
              bottom: 50
            },
            sliceTooltip: (e) => {
              return (
                <div className="bg-white p-2 text-sky-900 rounded">
                  {formatNumber(e.slice.points[0].data.y.toString())}
                </div>
              );
            },
            xScale: {
              type: 'time',
              format: '%Y-%m-%d',
              precision: 'year',
              useUTC: false
            },
            axisBottom: {
              tickValues: tickValues,
              format: '%Y'
            }
          }}
        />
      </div>
    </div>
  );
};

export default Totals;
