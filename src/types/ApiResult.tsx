import { QueryObserverResult } from 'react-query';

import { IFetchError } from './FetchError';

export interface IApiResult {
  error: IFetchError;
  result: QueryObserverResult;
}
