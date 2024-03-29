import React, { lazy, Suspense, useEffect } from 'react';

import { Switch, Route, useRouteMatch } from 'react-router-dom';

import Loader from '../common/Loader';
import MainMenu from './MainMenu';
import { sendChangeView } from '@/hooks/useAnalytics';
import useTopNavSync from '@/hooks/useTopNavSync';

const LazyAlbumTable = lazy(() => import('./AlbumTable'));
const LazyArtistTable = lazy(() => import('./ArtistTable'));
const LazyTracksTable = lazy(() => import('./TracksTable'));

const TopContainer: React.FC<Record<string, void>> = () => {
  useEffect(() => {
    sendChangeView('ranks');
  }, []);
  const { url } = useRouteMatch();

  useTopNavSync();

  return (
    <div>
      <MainMenu />
      <Suspense fallback={<Loader />}>
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
};

export default TopContainer;
