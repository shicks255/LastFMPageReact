import { BlockList } from 'net';

import React, { useContext } from 'react';

import Loader from '../common/Loader';
import { LocalStateContext } from '@/contexts/LocalStateContext';
import useUserStats from '@/hooks/api/musicApi/useUserStats';

const UserStats: React.FC<Record<string, void>> = () => {
  const { state } = useContext(LocalStateContext);
  const userStats = useUserStats(state.userName);

  const build = (key1: string | undefined) => {
    if (!userStats || userStats.isLoading || !userStats.data) {
      return <span style={{ width: 100, height: 25, display: 'block', background: 'lightgray' }} />;
    }
    return key1;
  };

  return (
    <div className="mb-12 mt-4 pl-4 pr-4" style={{ height: '500px', fontWeight: 'bold' }}>
      <section>
        <div className="text-left text-2xl font-semibold">User Statistics</div>
      </section>
      <div className="flex even:bg-slate-300 odd:bg-gray-200">
        <div className="flex-1 font-semibold w-2 mx-4 my-auto">Largest Artist Play Span</div>
        <div className="flex-1 p-2 m-auto">
          {build(userStats?.data?.oldestAndNewestArtist?.name)}
        </div>
        <div className="flex-1 m-auto text-right">
          {build(userStats?.data?.oldestAndNewestArtist?.timeStat.oldest)}
        </div>
        <div className="flex-1 m-auto text-right">
          {build(userStats?.data?.oldestAndNewestArtist?.timeStat.newest)}
        </div>
      </div>
      <div className="flex even:bg-slate-300 odd:bg-gray-200">
        <div className="flex-1 font-semibold w-2 mx-4 my-auto">Largest Album Play Span</div>
        <div className="flex-1 p-2 m-auto">
          {build(userStats?.data?.oldestAndNewestAlbum?.name)}
        </div>
        <div className="flex-1 m-auto text-right">
          {build(userStats?.data?.oldestAndNewestAlbum?.timeStat.oldest)}
        </div>
        <div className="flex-1 m-auto text-right">
          {build(userStats?.data?.oldestAndNewestAlbum?.timeStat.newest)}
        </div>
      </div>
      <div className="flex even:bg-slate-300 odd:bg-gray-200">
        <div className="flex-1 font-semibold w-2 mx-4 my-auto">Longest Dormant Artist</div>
        <div className="flex-1 p-2 m-auto">
          {build(userStats?.data?.longestDormancyArtist?.name)}
        </div>
        <div className="flex-1 m-auto text-right">
          {build(userStats?.data?.longestDormancyArtist?.timeStat.oldest)}
        </div>
        <div className="flex-1 m-auto text-right">
          {build(userStats?.data?.longestDormancyArtist?.timeStat.newest)}
        </div>
      </div>
      <div className="flex even:bg-slate-300 odd:bg-gray-200">
        <div className="flex-1 font-semibold flex-1 w-2 mx-4 my-auto">Longest Dormant Album</div>
        <div className="flex-1 p-2 m-auto">
          {build(userStats?.data?.longestDormancyAlbum?.name)}
        </div>
        <div className="flex-1 m-auto text-right">
          {build(userStats?.data?.longestDormancyAlbum?.timeStat.oldest)}
        </div>
        <div className="flex-1 m-auto text-right">
          {build(userStats?.data?.longestDormancyAlbum?.timeStat.newest)}
        </div>
      </div>
    </div>
  );
};

export default UserStats;
