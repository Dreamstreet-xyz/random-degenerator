import { useEffect } from 'react';

export default function useEscape(callback = () => console.log('escape pressed')) {
    useEffect(() => {
        const cancel = e => {
            if (e.keyCode === 27) {
                callback();
            }
        };
        window.addEventListener('keydown', cancel);
        return () => window.removeEventListener('keydown', cancel);
    }, [callback]);
}
