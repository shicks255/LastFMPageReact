import React, { lazy, Suspense } from 'react';

import ButtonGroup from './common/ButtonGroup';
import Main from './Main';
import ImageModal from './modals/ImageModal';
import Profile from './Profile';
import WeeklyScrobbleChart from './visuals/WeeklyScrobbleChart';
import useNavPathToStrategySync from '@/hooks/useParamToStrategySync';

const LazyNowPlaying = lazy(() => import('./NowPlaying'));

const Body: React.FC<Record<string, void>> = () => {
  useNavPathToStrategySync();

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
          <WeeklyScrobbleChart />
          <ButtonGroup />
          <div className="bg-gray-200 max-w-5xl rounded-bl-lg rounded-br-lg rounded-tr-lg">
            <ImageModal />
            <Main />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
