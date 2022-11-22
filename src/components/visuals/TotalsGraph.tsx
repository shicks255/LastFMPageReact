import React, { useContext } from 'react';

import { Theme } from '@nivo/core';
import { ResponsiveLine } from '@nivo/line';
import { cColors, formatNumber } from 'utils';

import Loader from '../common/Loader';
import VisualTitle from './common/VisualTitle';
import { LocalStateContext } from '@/contexts/LocalStateContext';
import useScrobbleTotals from '@/hooks/api/musicApi/useScrobbleTotals';

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

const TotalsGraph: React.FC = () => {
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
      data: chart
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
        <ResponsiveLine
          margin={{
            top: 10,
            right: 25,
            left: 75,
            bottom: 50
          }}
          colors={cColors}
          enableGridX={true}
          enableGridY={true}
          theme={theme}
          isInteractive={true}
          data={finalChart}
          pointLabelYOffset={0}
          enableSlices="x"
          sliceTooltip={(e) => {
            return (
              <div className="bg-white p-2 text-sky-900 rounded">
                {formatNumber(e.slice.points[0].data.y.toString())}
              </div>
            );
          }}
          xScale={{
            type: 'time',
            format: '%Y-%m-%d',
            precision: 'year',
            useUTC: false
          }}
          xFormat="time:%Y-%m-%d"
          axisBottom={{
            tickValues: tickValues,
            tickRotation: -75,
            format: '%Y'
          }}
          axisLeft={{
            format: (val) => {
              return formatNumber(val);
            }
          }}
        />
      </div>
    </div>
  );
};

export default TotalsGraph;
