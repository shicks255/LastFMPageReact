import { QueryObserverResult, useQuery } from 'react-query';
import { useContext } from 'react';
import { TopTracks } from '../../../types/TopTracks';
import { LocalStateContext } from '../../../contexts/LocalStateContext';
import { topTracksQuery } from '../../../service/api';
import queryOptions from '../../../service/queryOptions';

export default function useTopTracks(timeFrame: string, page: number):
  QueryObserverResult<TopTracks, Error> {
  const { state } = useContext(LocalStateContext);
  return useQuery(['topTracks', state.userName, timeFrame, page],
    async () => topTracksQuery(timeFrame, page, state.userName), queryOptions);
}
