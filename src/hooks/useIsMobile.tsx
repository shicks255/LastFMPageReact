import { useState, useEffect } from 'react';

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
