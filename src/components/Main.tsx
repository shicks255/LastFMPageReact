import React, { lazy, Suspense } from 'react';
// import ArtistTable from './top/ArtistTable';
// import AlbumTable from './top/AlbumTable';
// import TracksTable from './top/TracksTable';
import MainMenu from './MainMenu';
import RecentTracksTable from './RecentTracksTable';
import { useApiState } from '../contexts/ApiContext';
import Loader from './Loader';
// import Visuals from './visuals/Visuals';

const AlbumTable = lazy(() => import('./top/AlbumTable'));
const ArtistTable = lazy(() => import('./top/ArtistTable'));
const TracksTable = lazy(() => import('./top/TracksTable'));
const Visuals = lazy(() => import('./visuals/Visuals'));

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
      <Suspense fallback={<Loader small={false} />}>
        <MainMenu />
        {mainContent}
      </Suspense>
    </div>
  );
});

export default Main;
