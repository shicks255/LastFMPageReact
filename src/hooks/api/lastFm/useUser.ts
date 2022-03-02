import { QueryObserverResult, useQuery } from 'react-query';

import { userQuery } from '@/service/api';
import queryOptions from '@/service/queryOptions';
import { IUserResponse } from '@/types/User';

export default function useUserQuery(userName: string): QueryObserverResult<IUserResponse, Error> {
  return useQuery(['user', userName], async () => userQuery(userName), queryOptions);
}
