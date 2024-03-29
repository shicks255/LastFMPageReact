import { useContext } from 'react';

import { QueryObserverResult, useQuery } from 'react-query';

import { LocalStateContext } from '@/contexts/LocalStateContext';
import { topTracksQuery } from '@/service/api';
import queryOptions from '@/service/queryOptions';
import { ITopTracksResponse } from '@/types/TopTracks';

export default function useTopTracks(
  timeFrame: string,
  page: number
): QueryObserverResult<ITopTracksResponse, Error> {
  const { state } = useContext(LocalStateContext);
  return useQuery(
    ['topTracks', state.userName, timeFrame, page],
    async () => topTracksQuery(timeFrame, page, state.userName),
    queryOptions
  );
}
