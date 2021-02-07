import { useState, useEffect } from 'react';

// eslint-disable-next-line no-unused-vars
export default function useIsMobile(): boolean {
  const [size, setSize] = useState<number>(0);

  useEffect(() => {
    setSize(window.innerWidth);
    function handleResize() {
      setSize(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
  }, []);

  return size <= 768;
}
