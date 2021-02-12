import { useLayoutEffect } from 'react';

function useLockBodyScroll(showModal: boolean): void {
  if (showModal) {
    useLayoutEffect(() => {
      const originalStyle = window.getComputedStyle(document.documentElement).overflow;
      document.documentElement.style.overflow = 'hidden';

      return () => { document.documentElement.style.overflow = originalStyle; };
    }, []);
  }
}

export default useLockBodyScroll;
