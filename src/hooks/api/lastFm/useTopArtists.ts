import { useContext } from 'react';
import { QueryObserverResult, useQuery } from 'react-query';

import { topArtistsQuery } from '../../../service/api';

import { TopArtists } from '../../../types/TopArtists';
import { LocalStateContext } from '../../../contexts/LocalStateContext';
import queryOptions from '../../../service/queryOptions';

export default function useTopArtists(timeFrame: string, page: number):
  QueryObserverResult<TopArtists, Error> {
  const { state } = useContext(LocalStateContext);
  return useQuery(['topArtists', state.userName, timeFrame, page], async () => topArtistsQuery(timeFrame, page, state.userName), queryOptions);
}
