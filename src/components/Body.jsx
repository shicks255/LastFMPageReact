import React, { useContext } from 'react';
import MainMenu from './MainMenu';
import ArtistTable from './top/ArtistTable';
import AlbumTable from './top/AlbumTable';
import TracksTable from './top/TracksTable';
import RecentTracksTable from './RecentTracksTable';
import NowPlaying from './NowPlaying';
import Profile from './Profile';
import LoadingModal from './LoadingModal';
import Visuals from './visuals/Visuals';
import { LocalStateContext } from '../LocalStateContext';
import ButtonGroup from './ButtonGroup';

export default function Body() {
  const { state } = useContext(LocalStateContext);

  let topContent = '';
  if (state.strategy === 'getTopArtists') {
    topContent = <ArtistTable />;
  }
  if (state.strategy === 'getTopAlbums') {
    topContent = <AlbumTable />;
  }
  if (state.strategy === 'getTopTracks') {
    topContent = <TracksTable />;
  }

  let menu = '';
  let mainContent;
  if (state.selected === 'top') {
    mainContent = (
      <div>
        <br />
        <br />
        {topContent}
      </div>
    );
    menu = <MainMenu />;
  } else if (state.selected === 'vis') {
    mainContent = <Visuals timeFrame={state.timeFrame} />;
  } else {
    mainContent = <RecentTracksTable />;
  }

  const loading = state.loading ? <LoadingModal /> : '';
  const modalClass = state.modalImageSrc.length > 0 ? 'active imagePopup box' : 'imagePopup';

  return (
    <div>
      <NowPlaying nowPlaying={state.nowPlaying} />
      <div className="columns">
        <div className="column is-half is-offset-one-quarter has-text-centered">
          <Profile />
        </div>
      </div>
      <div className="columns menuButtons">
        <ButtonGroup />
      </div>
      <div className="columns">
        <div className="column is-10 is-offset-1">
          {menu}
          {loading}
          {mainContent}
        </div>
      </div>
      <div className={modalClass}>
        <img alt="" src={state.modalImageSrc} />
        <span style={{ color: 'black' }}><b>{state.modalImageCaption}</b></span>
      </div>
    </div>
  );
}
