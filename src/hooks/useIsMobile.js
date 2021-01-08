import { useState, useEffect } from 'react';

function useIsMobile() {
    const [size, setSize] = useState(undefined);

    useEffect(() => {
        setSize(window.innerWidth);
        function handleResize() {
            setSize(window.innerWidth);
        }
        window.addEventListener('resize', handleResize);
    }, [])

    return (size && size <= 768)
}