import React from 'react';
import NowPlaying from './NowPlaying';
import Profile from './Profile';
import ButtonGroup from './ButtonGroup';
import Main from './Main';
import ImageModal from './modals/ImageModal';

export default function Body() {
  return (
    <div className="container">
      <NowPlaying />
      <Profile />
      <ButtonGroup />
      <Main />
      <ImageModal />
    </div>
  );
}
