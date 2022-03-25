import { useState, useEffect } from 'react';

export default function useAudio(url) {
    const [audio] = useState(typeof Audio !== 'undefined' && new Audio(url));
    const [playing, setPlaying] = useState(false);

    const toggle = () => setPlaying(!playing);

    const play = () => {
        setPlaying(true);
    };

    const pause = () => setPlaying(false);

    const stop = () => {
        setPlaying(false);
        audio.currentTime = 0;
    };

    useEffect(() => {
        audio.volume = 0.1;
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

    return { play, pause, stop, playing, toggle };
}
