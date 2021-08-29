import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useApiDispatch } from '../contexts/ApiContext';

const useNavPathToStrategySync: (() => void) = (() => {
  const { setSelected } = useApiDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    switch (pathname) {
      case (pathname.match('/recent.*') || {}).input:
        setSelected('recent');
        break;
      case (pathname.match('/top.*') || {}).input:
        setSelected('top');
        break;
      case (pathname.match('/visuals.*') || {}).input:
        setSelected('vis');
        break;
      default:
        setSelected('recent');
    }
  }, [pathname]);
});

export default useNavPathToStrategySync;