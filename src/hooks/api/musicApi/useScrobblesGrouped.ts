import { QueryObserverResult, useQuery } from 'react-query';
import { scrobblesGroupedQuery } from '../../../service/api';
import queryOptions from '../../../service/queryOptions';
import { ScrobbleData } from '../../../types/Scrobble';

export default function useScrobblesGrouped(
  userName: string, timeGroup: string, start?: string, end?: string,
):
    QueryObserverResult<ScrobbleData[], Error> {
  return useQuery(
    ['scrobblesGrouped', timeGroup, start, end, userName],
    async () => scrobblesGroupedQuery(userName, timeGroup, start, end),
    queryOptions,
  );
}
