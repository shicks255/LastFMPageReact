import { useContext } from 'react';

import { QueryObserverResult, useQuery } from 'react-query';

import { LocalStateContext } from '@/contexts/LocalStateContext';
import { topArtistsQuery } from '@/service/api';
import queryOptions from '@/service/queryOptions';
import { ITopArtists } from '@/types/TopArtists';

export default function useTopArtists(
  timeFrame: string,
  page: number
): QueryObserverResult<ITopArtists, Error> {
  const { state } = useContext(LocalStateContext);
  return useQuery(
    ['topArtists', state.userName, timeFrame, page],
    async () => topArtistsQuery(timeFrame, page, state.userName),
    queryOptions
  );
}
