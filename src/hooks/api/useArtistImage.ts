import { QueryObserverResult, useQuery } from 'react-query';
import queryOptions from 'service/queryOptions';

import { getActualArtistUrl } from '../../utils';

const useArtistImage: (string, number) => QueryObserverResult<string, Error> = (
  mbid: string,
  artistName: string
) =>
  useQuery(
    ['artistImage', mbid, artistName],
    async () => getActualArtistUrl(mbid, artistName),
    queryOptions
  );

export default useArtistImage;
