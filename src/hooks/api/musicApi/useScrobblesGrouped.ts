import { QueryObserverResult, useQuery } from 'react-query';

import { scrobblesGroupedQuery } from '@/service/api';
import queryOptions from '@/service/queryOptions';
import { IScrobbleData } from '@/types/Scrobble';

export default function useScrobblesGrouped(
  userName: string,
  timeGroup: string,
  start?: string,
  end?: string
): QueryObserverResult<IScrobbleData[], Error> {
  return useQuery(
    ['scrobblesGrouped', timeGroup, start, end, userName],
    async () => scrobblesGroupedQuery(userName, timeGroup, start, end),
    queryOptions
  );
}
