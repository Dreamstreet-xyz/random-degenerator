import { useEffect } from 'react';
import {
    disableBodyScroll,
    enableBodyScroll,
    clearAllBodyScrollLocks,
    BodyScrollOptions,
} from 'body-scroll-lock';

export default function useBodyScrollLock(ref, isVisible) {
    useEffect(() => {
        const options: BodyScrollOptions = {
            reserveScrollBarGap: true,
        };
        if (ref.current) {
            isVisible ? disableBodyScroll(ref.current, options) : enableBodyScroll(ref.current);
        }
        return () => clearAllBodyScrollLocks();
    }, [ref, isVisible]);
}
