import { useContext } from 'react';

import { QueryObserverResult, useQuery } from 'react-query';

import { LocalStateContext } from '@/contexts/LocalStateContext';
import { topAlbumsQuery } from '@/service/api';
import queryOptions from '@/service/queryOptions';
import { ITopAlbums } from '@/types/TopAlbums';

export default function useTopAlbums(
  timeFrame: string,
  page: number
): QueryObserverResult<ITopAlbums, Error> {
  const { state } = useContext(LocalStateContext);
  return useQuery(
    ['topAlbums', state.userName, timeFrame, page],
    async () => topAlbumsQuery(timeFrame, page, state.userName),
    queryOptions
  );
}
