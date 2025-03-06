import React, { useContext } from 'react';

import styles from './UserStats.module.css';
import { LocalStateContext } from '@/contexts/LocalStateContext';
import useUserStats from '@/hooks/api/musicApi/useUserStats';
import useIsMobile from '@/hooks/useIsMobile';
import { IUserStat } from '@/types/UserStats';

const UserStats: React.FC<Record<string, void>> = () => {
  const { state } = useContext(LocalStateContext);
  const userStats = useUserStats(state.userName);
  const isMobile = useIsMobile();

  const build = (key1: string | undefined) => {
    if (!userStats || userStats.isLoading || !userStats.data) {
      return <span className={styles.skeletonLoader} />;
    }
    return key1;
  };

  const firstCellClass = 'flex-auto font-semibold w-2 mx-4 my-auto';
  const secondCellClass = 'flex-auto p-2 m-auto';
  const desktopThirdClass = 'flex-none w-32 text-center';
  const mobileLastClass = 'flex-auto m-auto text-right';

  const makeRow = (name: string, dateLabels: string[], timeStat?: IUserStat) => {
    if (!userStats || userStats.isLoading || !userStats.data) {
      return <span className={styles.skeletonLoader} />;
    }

    return (
      <tr className="h-16 odd:bg-slate-300 even:bg-gray-200">
        <td>
          <span className="font-semibold">{name}</span>
        </td>
        {isMobile && (
          <>
            <td>
              {timeStat?.name}
              {timeStat?.extra && (
                <>
                  <br />
                  {timeStat.extra}
                </>
              )}
            </td>
            <td>
              {dateLabels[0]}
              <br />
              &nbsp;&nbsp;{timeStat?.timeStat.oldest}
              {dateLabels.length > 1 && (
                <>
                  <br />
                  {dateLabels[1]}
                  <br />
                  &nbsp;&nbsp;{timeStat?.timeStat.newest}
                </>
              )}
            </td>
          </>
        )}
        {!isMobile && (
          <>
            <td>
              <span className={timeStat?.extra ? '' : 'font-bold'}>{timeStat?.name}</span>
              {timeStat?.extra && (
                <>
                  <br />
                  <span className="font-bold">{timeStat.extra}</span>
                </>
              )}
            </td>
            {dateLabels.length == 1 && (
              <>
                <td colSpan={2} className="m-auto">
                  <div className="m-auto text-align-center">
                    <span>{dateLabels[0]}</span>
                    <br />
                    <span>{timeStat?.timeStat.oldest}</span>
                  </div>
                </td>
              </>
            )}
            {dateLabels.length == 2 && (
              <>
                <td>
                  <span>{dateLabels[0]}</span>
                  <br />
                  <span>{timeStat?.timeStat.oldest}</span>
                </td>
                <td>
                  <span>{dateLabels[1]}</span>
                  <br />
                  <span>{timeStat?.timeStat.newest}</span>
                </td>
              </>
            )}
          </>
        )}
      </tr>
    );
  };

  return (
    <div className="mt-4 pl-4 pr-4" style={{ minWidth: '350px' }}>
      <section>
        <div className="text-left text-2xl font-semibold">User Statistics</div>
      </section>
      <div className="even:bg-slate-300 odd:bg-gray-200 mt-4">
        <table className="w-full">
          {makeRow(
            'Largest artist play span',
            ['First play', 'Most recent play'],
            userStats.data?.oldestAndNewestArtist
          )}
          {makeRow(
            'Largest album play span',
            ['First play', 'Most recent play'],
            userStats.data?.oldestAndNewestAlbum
          )}
          {makeRow(
            'Longest Dormant Artist',
            ['First play', 'Followup play'],
            userStats.data?.longestDormancyArtist
          )}
          {makeRow(
            'Longest Dormant Album',
            ['First play', 'Followup play'],
            userStats.data?.longestDormancyAlbum
          )}
          {makeRow('First artist to 100 scrobbles', ['Reached'], userStats.data?.firstTo100Artist)}
          {makeRow(
            'First artist to 1000 scrobbles',
            ['Reached'],
            userStats.data?.firstTo1000Artist
          )}
          {makeRow('First album to 100 scrobbles', ['Reached'], userStats.data?.firstTo1000Album)}
          {makeRow('First album to 1000 scrobbles', ['Reached'], userStats.data?.firstTo1000Album)}
          {makeRow('First song to 100 scrobbles', ['Reached'], userStats.data?.firstTo100Song)}
          {makeRow('First song to 1000 scrobbles', ['Reached'], userStats.data?.firstTo200Song)}
        </table>
      </div>
    </div>
  );
};

export default UserStats;
