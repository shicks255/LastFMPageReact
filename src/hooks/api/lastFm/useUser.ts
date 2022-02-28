import { QueryObserverResult, useQuery } from 'react-query';

import { userQuery } from '@/service/api';
import queryOptions from '@/service/queryOptions';
import { IUser } from '@/types/User';

export default function useUserQuery(userName: string): QueryObserverResult<IUser, Error> {
  return useQuery(['user', userName], async () => userQuery(userName), queryOptions);
}
