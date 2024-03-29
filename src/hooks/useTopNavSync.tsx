import { useEffect } from 'react';

import { useLocation, useHistory } from 'react-router-dom';

import { stripPageQueryParam, stripTimeFrameQueryParam } from '../utils';
import { useApiDispatch } from '@/contexts/ApiContext';

interface IQueryParams {
  page: number;
  timeFrame: string;
}

const useTopNavSync: () => void = () => {
  const { pathname, search } = useLocation();
  const history = useHistory();
  const { setTopItemsPage, setTopItemsTimeFrame, setTopItemsStrategy } = useApiDispatch();

  useEffect(() => {
    const page = stripPageQueryParam(search);
    const timeFrame = stripTimeFrameQueryParam(search);
    const queryParams: IQueryParams = {
      page,
      timeFrame
    };

    let newPath = '';
    const strat = pathname.split('/');
    if (strat.length < 3) {
      newPath += `${pathname}/artists`;
    } else {
      setTopItemsStrategy(strat[2]);
    }

    if (page < 1) {
      queryParams.page = 1;
    }
    setTopItemsPage(queryParams.page);

    if (timeFrame.length < 1) {
      queryParams.timeFrame = '7day';
    }
    setTopItemsTimeFrame(queryParams.timeFrame);

    if (newPath !== pathname || page !== queryParams.page || timeFrame !== queryParams.timeFrame) {
      const redirectPath = `${newPath}?page=${queryParams.page}&timeFrame=${queryParams.timeFrame}`;
      history.push(redirectPath);
    }
  }, [pathname, search, history, setTopItemsPage, setTopItemsStrategy, setTopItemsTimeFrame]);
};

export default useTopNavSync;
