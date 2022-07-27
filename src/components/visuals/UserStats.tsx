import React, { useContext } from 'react';

import styles from './UserStats.module.css';
import { LocalStateContext } from '@/contexts/LocalStateContext';
import useUserStats from '@/hooks/api/musicApi/useUserStats';
import useIsMobile from '@/hooks/useIsMobile';

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

  return (
    <div className="mb-12 mt-4 pl-4 pr-4" style={{ height: '500px', fontWeight: 'bold' }}>
      <section>
        <div className="text-left text-2xl font-semibold">User Statistics</div>
      </section>
      <div className="flex even:bg-slate-300 odd:bg-gray-200 mt-4">
        <div className={firstCellClass}>Largest Artist Play Span</div>
        <div className={secondCellClass}>{build(userStats?.data?.oldestAndNewestArtist?.name)}</div>
        {!isMobile && (
          <>
            <div className={desktopThirdClass}>
              First Play
              <br />
              {build(userStats?.data?.oldestAndNewestArtist?.timeStat.oldest)}
            </div>
            <div className={desktopThirdClass}>
              Last Play
              <br />
              {build(userStats?.data?.oldestAndNewestArtist?.timeStat.newest)}
            </div>
          </>
        )}
        {isMobile && (
          <div className={mobileLastClass}>
            First Play {build(userStats?.data?.oldestAndNewestArtist?.timeStat.oldest)}
            <br />
            Last Play {build(userStats?.data?.oldestAndNewestArtist?.timeStat.newest)}
          </div>
        )}
      </div>
      <div className="flex even:bg-slate-300 odd:bg-gray-200">
        <div className={firstCellClass}>Largest Album Play Span</div>
        <div className={secondCellClass}>{build(userStats?.data?.oldestAndNewestAlbum?.name)}</div>
        {!isMobile && (
          <>
            <div className={desktopThirdClass}>
              {build(userStats?.data?.oldestAndNewestAlbum?.timeStat.oldest)}
            </div>
            <div className={desktopThirdClass}>
              {build(userStats?.data?.oldestAndNewestAlbum?.timeStat.newest)}
            </div>
          </>
        )}
        {isMobile && (
          <div className={mobileLastClass}>
            First Play {build(userStats?.data?.oldestAndNewestAlbum?.timeStat.oldest)}
            <br />
            Last Play {build(userStats?.data?.oldestAndNewestAlbum?.timeStat.newest)}
          </div>
        )}
      </div>
      <div className="flex even:bg-slate-300 odd:bg-gray-200">
        <div className={firstCellClass}>Longest Dormant Artist</div>
        <div className={secondCellClass}>{build(userStats?.data?.longestDormancyArtist?.name)}</div>
        {!isMobile && (
          <>
            <div className={desktopThirdClass}>
              {build(userStats?.data?.longestDormancyArtist?.timeStat.oldest)}
            </div>
            <div className={desktopThirdClass}>
              {build(userStats?.data?.longestDormancyArtist?.timeStat.newest)}
            </div>
          </>
        )}
        {isMobile && (
          <div className={mobileLastClass}>
            No Plays between
            {build(userStats?.data?.longestDormancyArtist?.timeStat.oldest)}
            {build(userStats?.data?.longestDormancyArtist?.timeStat.newest)}
          </div>
        )}
      </div>
      <div className="flex even:bg-slate-300 odd:bg-gray-200">
        <div className={firstCellClass}>Longest Dormant Album</div>
        <div className={secondCellClass}>{build(userStats?.data?.longestDormancyAlbum?.name)}</div>
        {!isMobile && (
          <>
            <div className={desktopThirdClass}>
              {build(userStats?.data?.longestDormancyAlbum?.timeStat.oldest)}
            </div>
            <div className={desktopThirdClass}>
              {build(userStats?.data?.longestDormancyAlbum?.timeStat.newest)}
            </div>
          </>
        )}
        {isMobile && (
          <div className={mobileLastClass}>
            No Plasy between
            {build(userStats?.data?.longestDormancyAlbum?.timeStat.oldest)}
            {build(userStats?.data?.longestDormancyAlbum?.timeStat.newest)}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserStats;
