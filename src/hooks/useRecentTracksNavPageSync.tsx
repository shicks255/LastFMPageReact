import { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useApiDispatch } from '../contexts/ApiContext';

const useRecentTracksNavPageSync: (() => void) = (() => {
  const history = useHistory();
  const { pathname, search } = useLocation();
  const { setRecentTracksPage } = useApiDispatch();

  useEffect(() => {
    let pageNumber: number | undefined;
    const pageIndex = search.indexOf('page=');
    if (pageIndex > 0) {
      const maybePageNumber = search.slice(pageIndex + 5);
      pageNumber = Number(maybePageNumber);
      setRecentTracksPage(pageNumber);
    }

    if (!pageNumber || pageNumber < 1) {
      history.push(`${pathname}?page=1`);
    }
  }, [pathname, search]);
});

export default useRecentTracksNavPageSync;
