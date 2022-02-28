import { RefObject, SyntheticEvent, useEffect } from 'react';

function useClickOutside(
  ref: RefObject<HTMLDivElement | null>,
  callback: (e: SyntheticEvent) => void
): void {
  useEffect(() => {
    function handle(e) {
      if (!ref.current || !ref.current.contains(e.target)) {
        callback(e);
      }
    }

    document.addEventListener('click', handle);
    return () => {
      document.removeEventListener('click', handle);
    };
  }, [ref, callback]);
}

export default useClickOutside;
