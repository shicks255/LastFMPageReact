import { QueryObserverResult, useQuery } from 'react-query';

import { artistStatsQuery } from '@/service/api';
import queryOptions from '@/service/queryOptions';
import { IArtistStats } from '@/types/Scrobble';

export default function useArtistStats(
  userName: string,
  artistName: string
): QueryObserverResult<IArtistStats, Error> {
  return useQuery(
    ['artistStats', userName, artistName],
    async () => artistStatsQuery(userName, artistName),
    {
      ...queryOptions,
      enabled: artistName.length > 0
    }
  );
}
