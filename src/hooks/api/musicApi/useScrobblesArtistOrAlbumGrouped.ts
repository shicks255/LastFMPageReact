import { QueryObserverResult, useQuery } from 'react-query';

import { scrobblesAlbumOrArtistGroupedQuery } from '@/service/api';
import queryOptions from '@/service/queryOptions';
import { IScrobblesGrouped } from '@/types/Scrobble';

export default function useScrobblesArtistOrAlbumGrouped(
  resource: string,
  userName: string,
  timeGroup: string,
  start?: string,
  end?: string,
  limit?: number
): QueryObserverResult<IScrobblesGrouped, Error> {
  return useQuery(
    ['scrobblesGroupedArtistOrAlbum', resource, timeGroup, start, end, userName],
    async () =>
      scrobblesAlbumOrArtistGroupedQuery(resource, userName, timeGroup, start, end, limit, true),
    queryOptions
  );
}
