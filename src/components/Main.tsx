import React from 'react';
import ArtistTable from './top/ArtistTable';
import AlbumTable from './top/AlbumTable';
import TracksTable from './top/TracksTable';
import MainMenu from './MainMenu';
import Visuals from './visuals/Visuals';
import RecentTracksTable from './RecentTracksTable';
import { useApiState } from '../ApiContext';

const Main: React.FC<Record<string, void>> = ((): JSX.Element => {
  const { selected, strategy } = useApiState();

  let mainContent: JSX.Element = <RecentTracksTable />;
  if (selected === 'top') {
    if (strategy === 'getTopArtists') {
      mainContent = <ArtistTable />;
    }
    if (strategy === 'getTopAlbums') {
      mainContent = <AlbumTable />;
    }
    if (strategy === 'getTopTracks') {
      mainContent = <TracksTable />;
    }
  } else if (selected === 'vis') {
    mainContent = <Visuals />;
  } else {
    mainContent = <RecentTracksTable />;
  }

  return (
    <div className="">
      <MainMenu />
      {mainContent}
    </div>
  );
});

export default Main;
