import { QueryObserverResult, useQuery } from 'react-query';
import { useContext } from 'react';
import { recentTracksQuery } from 'service/api';
import { RecentTracks } from '../../../types/RecentTracks';
import { LocalStateContext } from '../../../contexts/LocalStateContext';

export default function useRecentTracks(page: number): QueryObserverResult<RecentTracks, Error> {
  const { state } = useContext(LocalStateContext);
  return useQuery(['recentTracks', state.userName, page],
    () => recentTracksQuery(page, state.userName),
    {
      refetchInterval: 30000,
      refetchOnWindowFocus: false,
      retry: 2,
    });
}
