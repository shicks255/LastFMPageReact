import { useContext } from 'react';

import { QueryObserverResult, useQuery } from 'react-query';

import { LocalStateContext } from '@/contexts/LocalStateContext';
import { recentTracksBigQuery } from '@/service/api';
import queryOptions from '@/service/queryOptions';
import { IRecentTracksResponse } from '@/types/RecentTracks';

export default function useRecentTracksBig(): QueryObserverResult<IRecentTracksResponse, Error> {
  const { state } = useContext(LocalStateContext);
  return useQuery(
    ['recentTracks', 'big', state.userName],
    async () => recentTracksBigQuery(state.userName),
    queryOptions
  );
}
