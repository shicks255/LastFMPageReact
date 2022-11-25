import { QueryObserverResult, useQuery } from 'react-query';

import { suggestArtist } from '@/service/api';
import queryOptions from '@/service/queryOptions';

export default function useSuggestArtist(
  userName: string,
  text: string
): QueryObserverResult<string[], Error> {
  return useQuery(['suggestArtist', userName, text], async () => suggestArtist(userName, text), {
    ...queryOptions,
    enabled: text.length > 2
  });
}
