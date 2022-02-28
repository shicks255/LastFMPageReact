import React, { useContext } from 'react';

import Loader from '../Loader';
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
    <div>
      <table>
        <tbody>
          <tr>
            <td>Largest Artist Play Span</td>
            <td>
              <span className="font-semibold">{userStats.data.oldestAndNewestArtist.name}</span>
            </td>
            <td>First play: {userStats.data.oldestAndNewestArtist.timeStat.oldest}</td>
            <td>
              Last play:
              {userStats.data.oldestAndNewestArtist.timeStat.newest}
            </td>
          </tr>
          <tr>
            <td>Largest Album Play Span </td>
            <td>
              <span className="font-semibold">{userStats.data.oldestAndNewestAlbum.name}</span>
            </td>
            <td>First play: {userStats.data.oldestAndNewestAlbum.timeStat.oldest}</td>
            <td>
              Last play:
              {userStats.data.oldestAndNewestAlbum.timeStat.newest}
            </td>
          </tr>
          <tr>
            <td>Longest Dormant Artist: </td>
            <td>
              <span className="font-semibold">{userStats.data.longestDormancyArtist.name}</span>
            </td>
            <td>No plays from {userStats.data.longestDormancyArtist.timeStat.oldest}</td>
            <td>
              {' '}
              to
              {userStats.data.longestDormancyArtist.timeStat.newest}
            </td>
          </tr>
          <tr>
            <td />
          </tr>
          <tr>
            <td>Longest Dormant Album: </td>
            <td>
              <span className="font-semibold">{userStats.data.longestDormancyAlbum.name}</span>
            </td>
            <td>No plays from {userStats.data.longestDormancyAlbum.timeStat.oldest}</td>
            <td>
              {' '}
              to
              {userStats.data.longestDormancyAlbum.timeStat.newest}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UserStats;
