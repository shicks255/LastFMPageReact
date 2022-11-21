import React, { useContext, useEffect, useState } from 'react';

import { Switch, Link, Route, useRouteMatch } from 'react-router-dom';

import Loader from '../common/Loader';
import DataLoadingModal from '../modals/DataLoadingModal';
import BumpChart from './BumpChart';
import CalendarChart from './Calendar';
import LineGraph from './LineGraph';
import Radar from './Radar';
import Sunburst from './SunburstChart';
import TotalsGraph from './TotalsGraph';
import TreeMaps from './TreeMaps';
import UserStats from './UserStats';
import { LocalStateContext } from '@/contexts/LocalStateContext';

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
  const [loadStatus, setLoadStatus] = useState<ILoadStatus | null>();

  useEffect(() => {
    function checkStatus() {
      return fetch(
        `https://musicapi.shicks255.com/api/v1/user/loadStatus?userName=${state.userName}`,
        // `http://localhost:8686/api/v1/user/loadStatus?userName=${state.userName}`,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    }

    let timeoutid: number | undefined = undefined;
    checkStatus()
      .then((res) => res.json())
      .then((res) => {
        setLoadStatus(res);
        if (res.currentPage !== res.totalPages) {
          timeoutid = window.setInterval(() => {
            checkStatus()
              .then((res) => res.json())
              .then((res) => {
                setLoadStatus(res);
                if (res.currentPage === res.totalPages) {
                  clearTimeout(timeoutid);
                }
              });
          }, 3250);
        }
      });

    return () => clearInterval(timeoutid);
  }, [state.userName]);

  if (!loadStatus) return <Loader />;

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
            className={`font-semibold px-8 py-4 border-r-2 rounded-t mt-1 ${
              visual === 'tree' ? selectedTabClass : 'bg-slate-300'
            }`}
          >
            <span className={visual === 'tree' ? selectedButtonClass : ''}>Tree</span>
          </Link>
          <Link
            to={`${path}/line`}
            className={`font-semibold px-8 py-4 border-r-2 rounded-t mt-1 ${
              visual === 'line' ? selectedTabClass : 'bg-slate-300'
            }`}
          >
            <span className={visual === 'line' ? selectedButtonClass : ''}>Line</span>
          </Link>
          <Link
            to={`${path}/totals`}
            className={`font-semibold px-8 py-4 border-r-2 rounded-t mt-1 ${
              visual === 'totals' ? selectedTabClass : 'bg-slate-300'
            }`}
          >
            <span className={visual === 'totals' ? selectedButtonClass : ''}>Totals</span>
          </Link>
          <Link
            to={`${path}/sunburst`}
            className={`font-semibold px-8 py-4 border-r-2 rounded-top mt-1 ${
              visual === 'sunburst' ? selectedTabClass : 'bg-slate-300'
            }`}
          >
            <span className={visual === 'sunburst' ? selectedButtonClass : ''}>Sunburst</span>
          </Link>
          <Link
            to={`${path}/bump`}
            className={`font-semibold px-8 py-4 border-r-2 rounded-t mt-1 ${
              visual === 'bump' ? selectedTabClass : 'bg-slate-300'
            }`}
          >
            <span className={visual === 'bump' ? selectedButtonClass : ''}>Bump</span>
          </Link>
          <Link
            to={`${path}/calendar`}
            className={`font-semibold px-8 py-4 border-r-2 rounded-t mt-1 ${
              visual === 'calendar' ? selectedTabClass : 'bg-slate-300'
            }`}
          >
            <span className={visual === 'calendar' ? selectedButtonClass : ''}>Calendar</span>
          </Link>
          <Link
            to={`${path}/radar`}
            className={`font-semibold px-8 py-4 border-r-2 rounded-t mt-1 ${
              visual === 'radar' ? selectedTabClass : 'bg-slate-300'
            }`}
          >
            <span className={visual === 'radar' ? selectedButtonClass : ''}>Radar</span>
          </Link>
          <Link
            to={`${path}/stats`}
            className={`font-semibold px-8 py-4 border-r-2 rounded-t mt-1 ${
              visual === 'stats' ? selectedTabClass : 'bg-slate-300'
            }`}
          >
            <span className={visual === 'stats' ? selectedButtonClass : ''}>User Stats</span>
          </Link>
        </div>
      </div>
      <div className="bg-gray-200 pb-20 rounded-tr-lg rounded-bl-lg rounded-br-lg">
        <Switch>
          <Route path={`${path}/tree`}>
            <TreeMaps />
          </Route>
          <Route path={`${path}/line`}>
            <LineGraph />
          </Route>
          <Route path={`${path}/totals`}>
            <TotalsGraph />
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
