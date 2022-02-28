import React from 'react';

import { useHistory, useLocation } from 'react-router-dom';

import { strategies, timeFrames } from '../../utils';
import { useApiState } from '@/contexts/ApiContext';

const MainMenu: React.FC<Record<string, void>> = () => {
  const history = useHistory();
  const { pathname, search } = useLocation();
  const { selected, topItemsStrategy, topItemsTimeFrame } = useApiState();

  let transformedStrategy;
  switch (topItemsStrategy) {
    case 'artists':
      transformedStrategy = 'getTopArtists';
      break;
    case 'albums':
      transformedStrategy = 'getTopAlbums';
      break;
    case 'tracks':
      transformedStrategy = 'getTopTracks';
      break;
    default:
      transformedStrategy = 'getTopArtists';
  }

  const strategySelects = Object.keys(strategies).map((value) => (
    <option key={value} value={value}>
      {strategies[value]}
    </option>
  ));
  const timeFrameSelects = Object.keys(timeFrames).map((value) => (
    <option key={value} value={value}>
      {timeFrames[value]}
    </option>
  ));

  if (selected !== 'top') return <></>;

  return (
    <>
      <div className="is-mobile">
        <div className="box column is-half is-offset-one-quarter has-text-centered">
          <div className="columns has-text-black">
            <div className="column">
              <span>
                <div className="select is-danger">
                  <select
                    value={transformedStrategy}
                    onChange={(event) => {
                      switch (event.target.value) {
                        case 'getTopArtists':
                          history.push(`/top/artists${search}`);
                          break;
                        case 'getTopAlbums':
                          history.push(`/top/albums${search}`);
                          break;
                        case 'getTopTracks':
                          history.push(`/top/tracks${search}`);
                          break;
                        default:
                          history.push(`/top/artists${search}`);
                      }
                    }}
                  >
                    {strategySelects}
                  </select>
                </div>
              </span>
            </div>
            <div className="column">
              <div className="select is-danger">
                <select
                  value={topItemsTimeFrame}
                  onChange={(event) => {
                    switch (event.target.value) {
                      case '7day':
                        history.push(`${pathname}?timeFrame=7day`);
                        break;
                      case '1month':
                        history.push(`${pathname}?timeFrame=1month`);
                        break;
                      case '3month':
                        history.push(`${pathname}?timeFrame=3month`);
                        break;
                      case '6month':
                        history.push(`${pathname}?timeFrame=6month`);
                        break;
                      case '12month':
                        history.push(`${pathname}?timeFrame=12month`);
                        break;
                      case 'overall':
                        history.push(`${pathname}?timeFrame=overall`);
                        break;
                      default:
                        history.push(`${pathname}?timeFrame=7day`);
                    }
                  }}
                >
                  {timeFrameSelects}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainMenu;
