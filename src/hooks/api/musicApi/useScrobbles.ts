import { QueryObserverResult, useQuery } from 'react-query';
import { scrobblesQuery } from '../../../service/api';
import queryOptions from '../../../service/queryOptions';
import { Scrobble } from '../../../types/Scrobble';

export default function useScrobbles(
  userName: string,
  start?: string,
  end?: string,
  artistName?: string,
  albumName?: string,
  limit?: number,
  sort?: string,
  direction?: string,
):
    QueryObserverResult<Scrobble[], Error> {
  return useQuery(
    ['scrobbles', start, end, userName],
    async () => scrobblesQuery(userName, artistName, albumName, start, end, limit, sort, direction),
    queryOptions,
  );
}
