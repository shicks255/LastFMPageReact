import { QueryObserverResult, useQuery } from 'react-query';
import queryOptions from '../../../service/queryOptions';
import { ScrobblesGrouped } from '../../../types/Scrobble';
import { scrobblesAlbumOrArtistGroupedQuery } from '../../../service/api';

export default function useScrobblesArtistOrAlbumGrouped(
  resource: string, userName: string, timeGroup: string, start?: string, end?: string, limit?: number,
):
  QueryObserverResult<ScrobblesGrouped, Error> {
  return useQuery(
    ['scrobblesGroupedArtistOrAlbum', resource, timeGroup, start, end, userName],
    async () => scrobblesAlbumOrArtistGroupedQuery(
      resource, userName, timeGroup, start, end, limit, true,
    ),
    queryOptions,
  );
}
