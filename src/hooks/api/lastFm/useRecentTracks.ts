import { useContext } from 'react';

import { QueryObserverResult, useQuery } from 'react-query';
import { recentTracksQuery } from 'service/api';

import { LocalStateContext } from '@/contexts/LocalStateContext';
import { IRecentTracksResponse } from '@/types/RecentTracks';

export default function useRecentTracks(
  page: number
): QueryObserverResult<IRecentTracksResponse, Error> {
  const { state } = useContext(LocalStateContext);
  return useQuery(
    ['recentTracks', state.userName, page],
    () => recentTracksQuery(page, state.userName),
    {
      refetchInterval: 30000,
      refetchOnWindowFocus: false,
      retry: 2
    }
  );
}
