import React, { useContext, useEffect, useState } from 'react';

import { Switch, Link, Route, useRouteMatch } from 'react-router-dom';

import Loader from '../common/Loader';
import ErrorMessage from '../ErrorMessage';
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

const Visuals: React.FC = () => {
  const match = useRouteMatch('/visuals/:visual');
  const { path } = useRouteMatch();

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const visual = match?.params.visual;

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

  const selectedTabClass = 'text-gray-200 bg-sky-900';
  const selectedButtonClass = 'font-semibold';

  return (
    <div>
      <div className="mx-auto rounded bg-white">
        <div className="inline-flex w-full flex-wrap">
          <Link
            to={`${path}/tree`}
            className={`px-4 py-2 border-r-2 rounded-t mt-1 ${
              visual === 'tree' ? selectedTabClass : 'bg-slate-300'
            }`}
          >
            <i className="fas fa-3x fa-calculator" />
            <span className={visual === 'tree' ? selectedButtonClass : ''}>Tree</span>
          </Link>
          <Link
            to={`${path}/line`}
            className={`px-4 py-2 border-r-2 rounded-t mt-1 ${
              visual === 'line' ? selectedTabClass : 'bg-slate-300'
            }`}
          >
            <i className="fas fa-3x fa-chart-line" />
            <span className={visual === 'line' ? selectedButtonClass : ''}>Line</span>
          </Link>
          <Link
            to={`${path}/sunburst`}
            className={`px-4 py-2 border-r-2 rounded-top mt-1 ${
              visual === 'sunburst' ? selectedTabClass : 'bg-slate-300'
            }`}
          >
            <i className="fas fa-3x fa-chart-pie" />
            <span className={visual === 'sunburst' ? selectedButtonClass : ''}>Sunburst</span>
          </Link>
          <Link
            to={`${path}/bump`}
            className={`px-4 py-2 border-r-2 rounded-t mt-1 ${
              visual === 'bump' ? selectedTabClass : 'bg-slate-300'
            }`}
          >
            <i className="fas fa-3x fa-random" />
            <span className={visual === 'bump' ? selectedButtonClass : ''}>Bump</span>
          </Link>
          <Link
            to={`${path}/calendar`}
            className={`px-4 py-2 border-r-2 rounded-t mt-1 ${
              visual === 'calendar' ? selectedTabClass : 'bg-slate-300'
            }`}
          >
            <i className="far fa-3x fa-calendar-alt" />
            <span className={visual === 'calendar' ? selectedButtonClass : ''}>Calendar</span>
          </Link>
          <Link
            to={`${path}/radar`}
            className={`px-4 py-2 border-r-2 rounded-t mt-1 ${
              visual === 'radar' ? selectedTabClass : 'bg-slate-300'
            }`}
          >
            <i className="fas fa-3x fa-wifi" />
            <span className={visual === 'radar' ? selectedButtonClass : ''}>Radar</span>
          </Link>
          <Link
            to={`${path}/stats`}
            className={`px-4 py-2 border-r-2 rounded-t mt-1 ${
              visual === 'stats' ? selectedTabClass : 'bg-slate-300'
            }`}
          >
            <i className="fas fa-3x fa-server" />
            <span className={visual === 'stats' ? selectedButtonClass : ''}>User Stats</span>
          </Link>
        </div>
      </div>
      <div className="bg-gray-200 pb-20">
        <Switch>
          <Route path={`${path}/tree`}>
            <TreeMaps />
          </Route>
          <Route path={`${path}/line`}>
            <LineGraph />
          </Route>
          <Route path={`${path}/sunburst`}>
            <Sunburst />
          </Route>
          <Route path={`${path}/bump`}>
            <BumpChart />
          </Route>
          <Route path={`${path}/calendar`}>
            <CalendarChart />
          </Route>
          <Route path={`${path}/radar`}>
            <Radar />
          </Route>
          <Route path={`${path}/stats`}>
            <UserStats />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default Visuals;
