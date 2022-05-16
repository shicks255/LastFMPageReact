import React from 'react';

import ButtonGroup from './common/ButtonGroup';
import Main from './Main';
import ImageModal from './modals/ImageModal';
import NowPlaying from './NowPlaying';
import Profile from './Profile';
import useNavPathToStrategySync from '@/hooks/useParamToStrategySync';

const Body: React.FC<Record<string, void>> = () => {
  useNavPathToStrategySync();

  return (
    <div className="font-sans min-h-screen min-w-screen lg:p-10">
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
        <div className="col-span-1 w-screen lg:w-auto">
          <div className="h-auto rounded-lg shadow-lg p-4 bg-gray-200">
            <Profile />
            <NowPlaying />
          </div>
        </div>
        <div className="col-span-2">
          <ButtonGroup />
          <div className="bg-gray-300 max-w-5xl">
            <Main />
            <ImageModal />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
