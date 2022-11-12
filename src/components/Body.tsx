import React, { lazy, Suspense, useContext } from 'react';

import { Theme } from '@nivo/core';
import { LineProps, ResponsiveLine } from '@nivo/line';

import { cColors } from '../utils';
import ButtonGroup from './common/ButtonGroup';
import Main from './Main';
import ImageModal from './modals/ImageModal';
import Profile from './Profile';
import { LocalStateContext } from '@/contexts/LocalStateContext';
import useUserQuery from '@/hooks/api/lastFm/useUser';
import useScrobblesGrouped from '@/hooks/api/musicApi/useScrobblesGrouped';
import useNavPathToStrategySync from '@/hooks/useParamToStrategySync';

const LazyNowPlaying = lazy(() => import('./NowPlaying'));

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
    top: 10,
    right: 15,
    left: 25,
    bottom: 50
  },
  theme: theme,
  isInteractive: false,
  enableGridY: false,
  enableGridX: false,
  colors: ['rgb(50,82,168'],
  lineWidth: 2,
  pointSize: 5,
  yScale: {
    type: 'linear',
    min: 0
  }
};

const Body: React.FC<Record<string, void>> = () => {
  useNavPathToStrategySync();

  const { state, actions } = useContext(LocalStateContext);
  const { isLoading, error, data } = useUserQuery(state.userName);

  const chartData = useScrobblesGrouped(state.userName, 'DAY', '2022-11-05', '2022-11-12');

  if (!chartData.data) {
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
    <div className="font-sans min-h-screen min-w-screen lg:p-10">
      <div className="grid lg:gap-4 grid-cols-1 lg:grid-cols-3">
        <div className="col-span-1">
          <div className="h-auto rounded-lg shadow-lg p-4 bg-gray-200 relative">
            <Profile />
            <Suspense fallback={<></>}>
              <LazyNowPlaying />
            </Suspense>
          </div>
        </div>
        <div className="col-span-2 mt-6 lg:mt-0">
          {newChart.length > 0 && (
            <div style={{ height: 100 }}>
              <ResponsiveLine
                {...commonGraphProps}
                data={finalChart}
                axisLeft={{
                  tickValues: 2
                }}
                axisBottom={{
                  format: (value) => value.toString().substring(5)
                }}
              />
            </div>
          )}
          <ButtonGroup />
          <div className="bg-gray-200 max-w-5xl">
            <ImageModal />
            <Main />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
