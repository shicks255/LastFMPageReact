import { useState, useEffect } from 'react';

// eslint-disable-next-line no-unused-vars
function useIsMobile() {
  const [size, setSize] = useState(undefined);

  useEffect(() => {
    setSize(window.innerWidth);
    function handleResize() {
      setSize(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
  }, []);

  return (size && size <= 768);
}
