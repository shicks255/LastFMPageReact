import React, { lazy, Suspense, useContext, useEffect } from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';

import Loader from './common/Loader';
import { LocalStateContext } from '@/contexts/LocalStateContext';

const RecentTracksTable = lazy(() => import('./recent/RecentTracksTable'));
const TopContainer = lazy(() => import('./top/TopContainer'));
const Visuals = lazy(() => import('./visuals/Visuals'));

const Main: React.FC = () => {
  const { state } = useContext(LocalStateContext);

  useEffect(() => {
    fetch(`https://musicapi.shicks255.com/api/v1/user/load?userName=${state.userName}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }, [state.userName]);

  return (
    <div>
      <Suspense fallback={<Loader />}>
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
};

export default Main;
