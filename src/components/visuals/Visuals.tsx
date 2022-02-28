import React, { useContext, useEffect, useState } from 'react';

import { Switch, Link, Route, useRouteMatch } from 'react-router-dom';

import ErrorMessage from '../ErrorMessage';
import Loader from '../Loader';
import DataLoadingModal from '../modals/DataLoadingModal';
import BumpChart from './BumpChart';
import CalendarChart from './Calendar';
import LineGraph from './LineGraph';
import Radar from './Radar';
import Sunburst from './SunburstChart';
import TreeMaps from './TreeMaps';
import UserStats from './UserStats';
import { LocalStateContext } from '@/contexts/LocalStateContext';
import useRecentTracksBig from '@/hooks/api/lastFm/useRecentTracksBig';

interface ILoadStatus {
  currentPage: number;
  totalPages: number;
  message: string;
}

const Visuals: React.FC<Record<string, void>> = () => {
  const { url, path } = useRouteMatch();
  const { state } = useContext(LocalStateContext);
  const [loadStatus, setLoadStatus] = useState<ILoadStatus>({
    currentPage: 0,
    totalPages: 100,
    message: ''
  });
  const { isLoading, error, data } = useRecentTracksBig();

  useEffect(() => {
    fetch(`https://musicapi.shicks255.com/api/v1/user/load?userName=${state.userName}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const timeoutid = window.setInterval(() => {
      fetch(`https://musicapi.shicks255.com/api/v1/user/loadStatus?userName=${state.userName}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then((res) => res.json())
        .then((res) => {
          setLoadStatus(res);
          if (res.currentPage === res.totalPages) {
            clearTimeout(timeoutid);
          }
        });
    }, 3500);

    return () => clearInterval(timeoutid);
  }, [state.userName]);

  if (isLoading) return <Loader small />;
  if (error) {
    return <ErrorMessage error={error} />;
  }
  if (!data) return <ErrorMessage error={new Error('')} />;

  if (loadStatus.currentPage !== loadStatus.totalPages) {
    return (
      <DataLoadingModal
        done={loadStatus.currentPage}
        total={loadStatus.totalPages}
        message={loadStatus.message}
      />
    );
  }

  return (
    <div>
      <div>
        <ul>
          <Link to={`${url}/tree`}>
            <i className="fas fa-3x fa-calculator" />
            <span>Tree Graphs</span>
          </Link>
          <Link to="/visuals/line">
            <i className="fas fa-3x fa-chart-line" />
            <span>Line Graphs</span>
          </Link>
          <Link to="/visuals/sunburst">
            <i className="fas fa-3x fa-chart-pie" />
            <span>Sunburst Graphs</span>
          </Link>
          <Link to="/visuals/bump">
            <i className="fas fa-3x fa-random" />
            <span>Bump Graphs</span>
          </Link>
          <Link to="/visuals/calendar">
            <i className="far fa-3x fa-calendar-alt" />
            <span>Calendar Graphs</span>
          </Link>
          <Link to="/visuals/radar">
            <i className="fas fa-3x fa-wifi" />
            <span>Radar Graphs</span>
          </Link>
          <Link to="/visuals/stats">
            <i className="fas fa-3x fa-server" />
            <span>User Stats</span>
          </Link>
        </ul>
        <div className="bg-gray-200 pb-20 -mr-4 -ml-4">
          <Switch>
            <Route path={`${path}/tree`}>
              <TreeMaps />
            </Route>
            <Route path="/visuals/line">
              <LineGraph />
            </Route>
            <Route path="/visuals/sunburst">
              <Sunburst />
            </Route>
            <Route path="/visuals/bump">
              <BumpChart />
            </Route>
            <Route path="/visuals/calendar">
              <CalendarChart />
            </Route>
            <Route path="/visuals/radar">
              <Radar />
            </Route>
            <Route path="/visuals/stats">
              <UserStats />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default Visuals;
