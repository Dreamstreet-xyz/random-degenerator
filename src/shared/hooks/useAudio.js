import { useState, useEffect } from 'react';

export default function useAudio(url) {
    const [audio] = useState(typeof Audio !== 'undefined' && new Audio(url));
    const [playing, setPlaying] = useState(false);

    const toggle = () => setPlaying(!playing);

    useEffect(() => {
        audio.volume = 0.15;
    }, [audio]);

    useEffect(() => {
        // eslint-disable-next-line no-unused-expressions
        playing ? audio.play() : audio.pause();
    }, [playing]);

    useEffect(() => {
        audio.addEventListener('ended', () => setPlaying(false));
        return () => {
            audio.removeEventListener('ended', () => setPlaying(false));
        };
    }, []);

    return [playing, toggle];
}
