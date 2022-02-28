import { useLayoutEffect } from 'react';

function useLockBodyScroll(showModal: boolean): void {
  useLayoutEffect(() => {
    if (showModal) {
      const originalStyle = window.getComputedStyle(document.documentElement).overflow;
      document.documentElement.style.overflow = 'hidden';

      return () => {
        document.documentElement.style.overflow = originalStyle;
      };
    }
  }, [showModal]);
}

export default useLockBodyScroll;
