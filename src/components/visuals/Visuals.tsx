import React, { useContext, useEffect, useState } from 'react';

import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';
import { musicApi } from 'utils';

import Loader from '../common/Loader';
import DataLoadingModal from '../modals/DataLoadingModal';
import ArtistStats from './Artist';
import Bump from './Bump';
import Calendar from './Calendar';
import Radar from './charts/Radar';
import Sunburst from './charts/SunburstChart';
import Line from './Line';
import Totals from './Totals';
import Tree from './Tree';
import UserStats from './UserStats';
import { LocalStateContext } from '@/contexts/LocalStateContext';
import { sendChangeView, sendChangeVisual } from '@/hooks/useAnalytics';

interface ILoadStatus {
  currentPage: number;
  totalPages: number;
  message: string;
}

const Visuals: React.FC = () => {
  useEffect(() => {
    sendChangeView('visuals');
  }, []);
  const match = useRouteMatch('/visuals/:visual');
  const { path } = useRouteMatch();

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const visual = match?.params.visual;

  const { state } = useContext(LocalStateContext);
  const [loadStatus, setLoadStatus] = useState<ILoadStatus | null>();

  useEffect(() => {
    function checkStatus() {
      return fetch(`${musicApi}/user/loadStatus?userName=${state.userName}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
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
            onClick={() => sendChangeVisual('tree')}
          >
            <span className={visual === 'tree' ? selectedButtonClass : ''}>Tree</span>
          </Link>
          <Link
            to={`${path}/line`}
            className={`font-semibold px-8 py-4 border-r-2 rounded-t mt-1 ${
              visual === 'line' ? selectedTabClass : 'bg-slate-300'
            }`}
            onClick={() => sendChangeVisual('line')}
          >
            <span className={visual === 'line' ? selectedButtonClass : ''}>Line</span>
          </Link>
          <Link
            to={`${path}/totals`}
            className={`font-semibold px-8 py-4 border-r-2 rounded-t mt-1 ${
              visual === 'totals' ? selectedTabClass : 'bg-slate-300'
            }`}
            onClick={() => sendChangeVisual('totals')}
          >
            <span className={visual === 'totals' ? selectedButtonClass : ''}>Totals</span>
          </Link>
          <Link
            to={`${path}/sunburst`}
            className={`font-semibold px-8 py-4 border-r-2 rounded-top mt-1 ${
              visual === 'sunburst' ? selectedTabClass : 'bg-slate-300'
            }`}
            onClick={() => sendChangeVisual('sunburst')}
          >
            <span className={visual === 'sunburst' ? selectedButtonClass : ''}>Sunburst</span>
          </Link>
          <Link
            to={`${path}/bump`}
            className={`font-semibold px-8 py-4 border-r-2 rounded-t mt-1 ${
              visual === 'bump' ? selectedTabClass : 'bg-slate-300'
            }`}
            onClick={() => sendChangeVisual('bump')}
          >
            <span className={visual === 'bump' ? selectedButtonClass : ''}>Bump</span>
          </Link>
          <Link
            to={`${path}/calendar`}
            className={`font-semibold px-8 py-4 border-r-2 rounded-t mt-1 ${
              visual === 'calendar' ? selectedTabClass : 'bg-slate-300'
            }`}
            onClick={() => sendChangeVisual('calendar')}
          >
            <span className={visual === 'calendar' ? selectedButtonClass : ''}>Calendar</span>
          </Link>
          <Link
            to={`${path}/radar`}
            className={`font-semibold px-8 py-4 border-r-2 rounded-t mt-1 ${
              visual === 'radar' ? selectedTabClass : 'bg-slate-300'
            }`}
            onClick={() => sendChangeVisual('radar')}
          >
            <span className={visual === 'radar' ? selectedButtonClass : ''}>Radar</span>
          </Link>
          <Link
            to={`${path}/stats`}
            className={`font-semibold px-8 py-4 border-r-2 rounded-t mt-1 ${
              visual === 'stats' ? selectedTabClass : 'bg-slate-300'
            }`}
            onClick={() => sendChangeVisual('stats')}
          >
            <span className={visual === 'stats' ? selectedButtonClass : ''}>User Stats</span>
          </Link>
          <Link
            to={`${path}/artist`}
            className={`font-semibold px-8 py-4 border-r-2 rounded-t mt-1 ${
              visual === 'artist' ? selectedTabClass : 'bg-slate-300'
            }`}
            onClick={() => sendChangeVisual('artistStats')}
          >
            <span className={visual === 'artist' ? selectedButtonClass : ''}>Artist</span>
          </Link>
        </div>
      </div>
      <div className="bg-gray-200 pb-10 rounded-tr-lg rounded-bl-lg rounded-br-lg">
        <Switch>
          <Route path={`${path}/tree`}>
            <Tree />
          </Route>
          <Route path={`${path}/line`}>
            <Line />
          </Route>
          <Route path={`${path}/totals`}>
            <Totals />
          </Route>
          <Route path={`${path}/sunburst`}>
            <Sunburst />
          </Route>
          <Route path={`${path}/bump`}>
            <Bump />
          </Route>
          <Route path={`${path}/calendar`}>
            <Calendar />
          </Route>
          <Route path={`${path}/radar`}>
            <Radar />
          </Route>
          <Route path={`${path}/stats`}>
            <UserStats />
          </Route>
          <Route path={`${path}/artist`}>
            <ArtistStats />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default Visuals;
