import React, { useContext } from 'react';

import Loader from '../common/Loader';
import { LocalStateContext } from '@/contexts/LocalStateContext';
import useUserStats from '@/hooks/api/musicApi/useUserStats';

const UserStats: React.FC<Record<string, void>> = () => {
  const { state } = useContext(LocalStateContext);
  const userStats = useUserStats(state.userName);

  if (!userStats || !userStats.data) {
    return <></>;
  }

  if (userStats.isLoading) {
    return <Loader small={false} />;
  }

  return (
    <div className="mb-12 mt-4 pl-4 pr-4" style={{ height: '500px', fontWeight: 'bold' }}>
      <section>
        <div className="text-left text-2xl font-semibold">User Statistics</div>
      </section>
      <div className="flex even:bg-slate-300 odd:bg-gray-200">
        <div className="flex-1 font-semibold w-2 mx-4 my-auto">Largest Artist Play Span</div>
        <div className="flex-1 p-2 m-auto">{userStats.data.oldestAndNewestArtist.name}</div>
        <div className="flex-1 m-auto text-right">
          {userStats.data.oldestAndNewestArtist.timeStat.oldest}
        </div>
        <div className="flex-1 m-auto text-right">
          {userStats.data.oldestAndNewestArtist.timeStat.newest}
        </div>
      </div>
      <div className="flex even:bg-slate-300 odd:bg-gray-200">
        <div className="flex-1 font-semibold w-2 mx-4 my-auto">Largest Album Play Span</div>
        <div className="flex-1 p-2 m-auto">{userStats.data.oldestAndNewestAlbum.name}</div>
        <div className="flex-1 m-auto text-right">
          {userStats.data.oldestAndNewestAlbum.timeStat.oldest}
        </div>
        <div className="flex-1 m-auto text-right">
          {userStats.data.oldestAndNewestAlbum.timeStat.newest}
        </div>
      </div>
      <div className="flex even:bg-slate-300 odd:bg-gray-200">
        <div className="flex-1 font-semibold w-2 mx-4 my-auto">Longest Dormant Artist</div>
        <div className="flex-1 p-2 m-auto">{userStats.data.longestDormancyArtist.name}</div>
        <div className="flex-1 m-auto text-right">
          {userStats.data.longestDormancyArtist.timeStat.oldest}
        </div>
        <div className="flex-1 m-auto text-right">
          {userStats.data.longestDormancyArtist.timeStat.newest}
        </div>
      </div>
      <div className="flex even:bg-slate-300 odd:bg-gray-200">
        <div className="flex-1 font-semibold flex-1 w-2 mx-4 my-auto">Longest Dormant Album</div>
        <div className="flex-1 p-2 m-auto">{userStats.data.longestDormancyAlbum.name}</div>
        <div className="flex-1 m-auto text-right">
          {userStats.data.longestDormancyAlbum.timeStat.oldest}
        </div>
        <div className="flex-1 m-auto text-right">
          {userStats.data.longestDormancyAlbum.timeStat.newest}
        </div>
      </div>
    </div>

    // <div>
    //   <table>
    //     <tbody>
    //       <tr>
    //         <td>Largest Artist Play Span</td>
    //         <td>
    //           <span className="font-semibold">{userStats.data.oldestAndNewestArtist.name}</span>
    //         </td>
    //         <td>First play: {userStats.data.oldestAndNewestArtist.timeStat.oldest}</td>
    //         <td>
    //           Last play:
    //           {userStats.data.oldestAndNewestArtist.timeStat.newest}
    //         </td>
    //       </tr>
    //       <tr>
    //         <td>Largest Album Play Span </td>
    //         <td>
    //           <span className="font-semibold">{userStats.data.oldestAndNewestAlbum.name}</span>
    //         </td>
    //         <td>First play: {userStats.data.oldestAndNewestAlbum.timeStat.oldest}</td>
    //         <td>
    //           Last play:
    //           {userStats.data.oldestAndNewestAlbum.timeStat.newest}
    //         </td>
    //       </tr>
    //       <tr>
    //         <td>Longest Dormant Artist: </td>
    //         <td>
    //           <span className="font-semibold">{userStats.data.longestDormancyArtist.name}</span>
    //         </td>
    //         <td>No plays from {userStats.data.longestDormancyArtist.timeStat.oldest}</td>
    //         <td>
    //           {' '}
    //           to
    //           {userStats.data.longestDormancyArtist.timeStat.newest}
    //         </td>
    //       </tr>
    //       <tr>
    //         <td />
    //       </tr>
    //       <tr>
    //         <td>Longest Dormant Album: </td>
    //         <td>
    //           <span className="font-semibold">{userStats.data.longestDormancyAlbum.name}</span>
    //         </td>
    //         <td>No plays from {userStats.data.longestDormancyAlbum.timeStat.oldest}</td>
    //         <td>
    //           {' '}
    //           to
    //           {userStats.data.longestDormancyAlbum.timeStat.newest}
    //         </td>
    //       </tr>
    //     </tbody>
    //   </table>
    // </div>
  );
};

export default UserStats;
