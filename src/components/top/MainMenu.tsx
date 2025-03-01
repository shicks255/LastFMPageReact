import React from 'react';

import { useHistory, useLocation } from 'react-router-dom';

import { internalTimeFrames, strategies, timeFrames } from '../../utils';
import { useApiState } from '@/contexts/ApiContext';
import { sendChangeTimeFrame } from '@/hooks/useAnalytics';

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
    <option
      key={value}
      value={value}
      className={transformedStrategy === value ? 'font-semibold' : ''}
    >
      {strategies[value]}
    </option>
  ));
  const timeFrameSelects = Object.keys(timeFrames)
    .filter((value) => !internalTimeFrames.includes(value))
    .map((value) => (
      <option
        key={value}
        value={value}
        className={topItemsTimeFrame === value ? 'font-semibold' : ''}
      >
        {timeFrames[value]}
      </option>
    ));

  const handleStrategySelect = (selection: string) => {
    switch (selection) {
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
  };

  const handleTimeFrameSelect = (selection: string) => {
    sendChangeTimeFrame(selection);
    switch (selection) {
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
  };

  if (selected !== 'top') return <></>;

  return (
    <>
      <div className="p-2">
        <select
          className="px-3 py-1.5 md:w-32 w-full
                    rounded border border-solid
                    border-gray-300 transition ease-in-out bg-white"
          value={transformedStrategy}
          onChange={(event) => handleStrategySelect(event.target.value)}
        >
          {strategySelects}
        </select>
      </div>
      <div className="p-2">
        <select
          className="px-3 py-1.5 md:w-32 w-full
                    rounded border border-solid
                    border-gray-300 transition ease-in-out bg-white"
          value={topItemsTimeFrame}
          onChange={(event) => handleTimeFrameSelect(event.target.value)}
        >
          {timeFrameSelects}
        </select>
      </div>
    </>
  );
};

export default MainMenu;
