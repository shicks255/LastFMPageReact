import { QueryObserverResult, useQuery } from 'react-query';
import { useContext } from 'react';
import { TopAlbums } from '../../../types/TopAlbums';
import { LocalStateContext } from '../../../contexts/LocalStateContext';
import { topAlbumsQuery } from '../../../service/api';
import queryOptions from '../../../service/queryOptions';

export default function useTopAlbums(timeFrame: string, page: number):
  QueryObserverResult<TopAlbums, Error> {
  const { state } = useContext(LocalStateContext);
  return useQuery(['topAlbums', state.userName, timeFrame, page], async () => topAlbumsQuery(timeFrame, page, state.userName), queryOptions);
}
