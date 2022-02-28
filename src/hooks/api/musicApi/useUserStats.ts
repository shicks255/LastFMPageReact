import { QueryObserverResult, useQuery } from 'react-query';

import { userStatsQuery } from '@/service/api';
import queryOptions from '@/service/queryOptions';
import UserStats from '@/types/UserStats';

export default function useUserStats(userName: string): QueryObserverResult<UserStats, Error> {
  return useQuery(['userStats', userName], async () => userStatsQuery(userName), queryOptions);
}
