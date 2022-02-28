import React, { lazy, Suspense } from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';

import Loader from './Loader';
import RecentTracksTable from './recent/RecentTracksTable';
import TopContainer from './top/TopContainer';

const Visuals = lazy(() => import('./visuals/Visuals'));

const Main: React.FC<Record<string, void>> = (): JSX.Element => (
  <div>
    <Suspense fallback={<Loader small={false} />}>
      <Switch>
        <Route path="/recent">
          <RecentTracksTable />
        </Route>
        <Route path="/top">
          <TopContainer />
        </Route>
        <Route path="/visuals">
          <Visuals />
        </Route>
        <Route render={() => <Redirect to="/recent?page=1" />} />
      </Switch>
    </Suspense>
  </div>
);

export default Main;
