import { QueryObserverResult, useQuery } from 'react-query';
import { User } from '../../../types/User';
import { userQuery } from '../../../service/api';
import queryOptions from '../../../service/queryOptions';

export default function useUserQuery(userName: string): QueryObserverResult<User, Error> {
  return useQuery(['user', userName], async () => userQuery(userName), queryOptions);
}
