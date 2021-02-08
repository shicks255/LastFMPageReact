import { QueryObserverResult } from 'react-query';
import { FetchError } from './FetchError';

export type ApiResult = {
    error: FetchError,
    result: QueryObserverResult
}
