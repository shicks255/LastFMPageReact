import { QueryObserverResult, useQuery } from 'react-query';

import { scrobbleTotals } from '@/service/api';
import queryOptions from '@/service/queryOptions';
import { IScrobblesGrouped, IScrobbleTotals } from '@/types/Scrobble';

export default function useScrobbleTotals(
  userName: string,
  timeGroup: string,
  start?: string,
  end?: string
): QueryObserverResult<IScrobbleTotals, Error> {
  return useQuery(
    ['scrobblesTotaled', timeGroup, start, end, userName],
    async () => scrobbleTotals(userName, timeGroup, start, end),
    queryOptions
  );
}
