import { useContext } from 'react';

import { QueryObserverResult, useQuery } from 'react-query';

import { LocalStateContext } from '@/contexts/LocalStateContext';
import { topTracksQuery } from '@/service/api';
import queryOptions from '@/service/queryOptions';
import { ITopTracks } from '@/types/TopTracks';

export default function useTopTracks(
  timeFrame: string,
  page: number
): QueryObserverResult<ITopTracks, Error> {
  const { state } = useContext(LocalStateContext);
  return useQuery(
    ['topTracks', state.userName, timeFrame, page],
    async () => topTracksQuery(timeFrame, page, state.userName),
    queryOptions
  );
}
