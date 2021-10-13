import React, { useContext, useEffect, useState } from 'react';
import {
  Switch, Link, Route, useRouteMatch,
} from 'react-router-dom';
import LineGraph from './LineGraph';
import Sunburst from './SunburstChart';
import BumpChart from './BumpChart';
import ErrorMessage from '../ErrorMessage';
import Loader from '../Loader';
import TreeMaps from './TreeMaps';
import { useRecentTracksBig } from '../../hooks/useLasftFmApi';
import CalendarChart from './Calendar';
import Radar from './Radar';
import UserStats from './UserStats';
import DataLoadingModal from '../modals/DataLoadingModal';
import { LocalStateContext } from '../../contexts/LocalStateContext';

interface ILoadStatus {
    currentPage: number,
    totalPages: number,
    message: string
}

const Visuals: React.FC<Record<string, void>> = (() => {
  const { url, path } = useRouteMatch();
  const { state } = useContext(LocalStateContext);
  const [loadStatus, setLoadStatus] = useState<ILoadStatus>({
    currentPage: 0,
    totalPages: 100,
    message: '',
  });
  const {
    isLoading, error, data,
  } = useRecentTracksBig();

  useEffect(() => {
    fetch(`https://musicapi.shicks255.com/api/v1/user/load?userName=${state.userName}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

    const timeoutid = window.setInterval(() => {
      fetch(`https://musicapi.shicks255.com/api/v1/user/loadStatus?userName=${state.userName}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
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
  }, []);

  if (isLoading) return <Loader small />;
  if (error) {
    return <ErrorMessage error={error} />;
  }
  if (!data) return <ErrorMessage error={new Error('')} />;

  // const recentTracks = data.track
  //   .filter((x) => Object.prototype.hasOwnProperty.call(x, 'date'));

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
        <Link to={`${url}/tree`}>
          <li className="fas fa-3x fa-calculator">
            <span>Tree Graphs</span>
          </li>
        </Link>
        <Link to="/visuals/line">
          <li className="fas fa-3x fa-chart-line">
            <span>Line Graphs</span>
          </li>
        </Link>
        <Link to="/visuals/sunburst">
          <li className="fas fa-3x fa-chart-pie">
            <span>Sunburst Graphs</span>
          </li>
        </Link>
        <Link to="/visuals/bump">
          <li className="fas fa-3x fa-random">
            <span>Bump Graphs</span>
          </li>
        </Link>
        <Link to="/visuals/calendar">
          <li className="far fa-3x fa-calendar-alt">
            <span>Calendar Graphs</span>
          </li>
        </Link>
        <Link to="/visuals/radar">
          <li className="fas fa-3x fa-wifi">
            <span>Radar Graphs</span>
          </li>
        </Link>
        <Link to="/visuals/stats">
          <li className="fas fa-3x fa-server">
            <span>User Stats</span>
          </li>
        </Link>
        <div>
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
});

export default Visuals;
