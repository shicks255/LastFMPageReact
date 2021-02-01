import React, { useContext } from 'react';
import { LocalStateContext } from '../LocalStateContext';
import ArtistTable from './top/ArtistTable';
import AlbumTable from './top/AlbumTable';
import TracksTable from './top/TracksTable';
import MainMenu from './MainMenu';
import Visuals from './visuals/Visuals';
import RecentTracksTable from './RecentTracksTable';

const Main: React.FC<Record<string, void>> = ((): JSX.Element => {
  const { state } = useContext(LocalStateContext);

  let mainContent: JSX.Element = <RecentTracksTable />;
  if (state.selected === 'top') {
    if (state.strategy === 'getTopArtists') {
      mainContent = <ArtistTable />;
    }
    if (state.strategy === 'getTopAlbums') {
      mainContent = <AlbumTable />;
    }
    if (state.strategy === 'getTopTracks') {
      mainContent = <TracksTable />;
    }
  } else if (state.selected === 'vis') {
    mainContent = <Visuals />;
  } else {
    mainContent = <RecentTracksTable />;
  }

  return (
    <div className="columns">
      <div className="column is-10 is-offset-1">
        <MainMenu />
        {mainContent}
      </div>
    </div>
  );
});

export default Main;
