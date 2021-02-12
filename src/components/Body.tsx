import React from 'react';
import NowPlaying from './NowPlaying';
import Profile from './Profile';
import ButtonGroup from './ButtonGroup';
import Main from './Main';
import ImageModal from './modals/ImageModal';
import { ApiContextProvider } from '../contexts/ApiContext';
import { ModalContextProvider } from '../contexts/ModalContext';

const Body: React.FC<Record<string, void>> = (() => (
  <div className="container">
    <ApiContextProvider>
      <ModalContextProvider>
        <NowPlaying />
        <Profile />
        <ButtonGroup />
        <Main />
        <ImageModal />
      </ModalContextProvider>
    </ApiContextProvider>
  </div>
));

export default Body;
