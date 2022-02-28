import { QueryObserverResult, useQuery } from 'react-query';
import { useContext } from 'react';
import { RecentTracks } from '../../../types/RecentTracks';
import { LocalStateContext } from '../../../contexts/LocalStateContext';
import { recentTracksBigQuery } from '../../../service/api';
import queryOptions from '../../../service/queryOptions';

export default function useRecentTracksBig(): QueryObserverResult<RecentTracks, Error> {
  const { state } = useContext(LocalStateContext);
  return useQuery(['recentTracks', 'big', state.userName], async () => recentTracksBigQuery(state.userName), queryOptions);
}
