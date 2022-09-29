import { useEffect, RefObject } from 'react';

type Handler = (event: MouseEvent | TouchEvent) => void;

export default function useOutsideClick<T extends HTMLElement = HTMLElement>(
    ref: RefObject<T>,
    callback: Handler,
    ignore?: RefObject<T>
) {
    useEffect(() => {
        function handleClickOutside(e: MouseEvent | TouchEvent) {
            if (
                ref.current &&
                !ref.current.contains?.(e.target as Node) &&
                !ignore?.current?.contains(e.target as Node)
            ) {
                callback(e);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, [ref, callback, ignore]);
}
