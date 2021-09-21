import React, { lazy, Suspense } from 'react';
import {
  Switch, Route, useRouteMatch,
} from 'react-router-dom';
import Loader from '../Loader';
import useTopNavSync from '../../hooks/useTopNavSync';
import MainMenu from './MainMenu';

const LazyAlbumTable = lazy(() => import('./AlbumTable'));
const LazyArtistTable = lazy(() => import('./ArtistTable'));
const LazyTracksTable = lazy(() => import('./TracksTable'));

const TopContainer: React.FC<Record<string, void>> = (() => {
  const { url } = useRouteMatch();

  useTopNavSync();

  return (
    <div>
      <MainMenu />
      <Suspense fallback={<Loader small={false} />}>
        <Switch>
          <Route path={`${url}/artists`}>
            <LazyArtistTable />
          </Route>
          <Route path={`${url}/albums`}>
            <LazyAlbumTable />
          </Route>
          <Route path={`${url}/tracks`}>
            <LazyTracksTable />
          </Route>
        </Switch>
      </Suspense>
    </div>
  );
});

export default TopContainer;
