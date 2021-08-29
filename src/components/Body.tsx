import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import NowPlaying from './NowPlaying';
import Profile from './Profile';
import ButtonGroup from './ButtonGroup';
import Main from './Main';
import ImageModal from './modals/ImageModal';

import useNavPathToStrategySync from '../hooks/useParamToStrategySync';

const Body: React.FC<Record<string, void>> = (() => {
  useNavPathToStrategySync();

  return (
    <div className="container">
      <NowPlaying />
      <Profile />
      <ButtonGroup />
      <Main />
      <ImageModal />
    </div>
  );
});

export default Body;
