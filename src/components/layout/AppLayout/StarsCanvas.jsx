/* eslint-disable func-names */
/* eslint-disable wrap-iife */
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    height: 100vh;
    background: transparent;
    z-index: -1;
    pointer-events: none;
    user-select: none;
`;

const Canvas = styled.canvas`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    user-select: none;
    pointer-events: none;
`;

const STARS_VELOCITY = -0.0003;
const NUM_OF_STARS = 5000;

function StarsCanvas() {
    const containerRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d', { alpha: false });
        const stars = [];
        let play = true;

        const init = () => {
            const viewport = containerRef.current;
            canvas.width = viewport.offsetWidth;
            canvas.height = viewport.offsetHeight;
            // eslint-disable-next-line no-plusplus
            for (let i = 0; i < NUM_OF_STARS; i++) {
                const size = Math.random() / 2;
                stars.push({
                    x: Math.random(),
                    y: Math.random(),
                    size,
                    min: Math.max(size - 0.15, 0.2),
                    max: Math.min(size + 0.15, 0.5),
                    change: Math.random() > 0.5 ? Math.random() / 80 : 0,
                    color: `rgb(255,255,255,${Math.random()})`, // #d3feff for lightmode
                });
            }
        };

        const render = () => {
            const { width, height } = canvas;

            const gradient = context.createLinearGradient(width / 2, height, width / 2, 0);
            gradient.addColorStop(1, '#07033a');
            gradient.addColorStop(0.5, '#0d0858');
            gradient.addColorStop(0.02, '#470a8d');

            context.fillStyle = gradient;
            context.fillRect(0, 0, width, height);

            stars.forEach(star => {
                context.fillStyle = star.color;
                context.fillRect(
                    star.x * width - star.size * 2.5,
                    star.y * height - star.size * 2.5,
                    star.size * 5,
                    star.size * 5
                );
            });
        };

        const update = () => {
            if (!play) return;

            stars.forEach(star => {
                star.y += STARS_VELOCITY;
                if (star.y < 0) {
                    star.y += 1;
                }
                if (star.size <= star.min) {
                    star.change *= -1;
                } else if (star.size >= star.max) {
                    star.change *= -1;
                }
                star.size += star.change;
            });

            window.requestAnimationFrame(render);
        };

        const handleVisibilityChange = () => {
            play = !document.hidden;
        };

        function resetDimensions() {
            const viewport = containerRef.current;
            canvas.width = viewport.offsetWidth;
            canvas.height = viewport.offsetHeight;
        }

        window.onzoom = () => {
            resetDimensions();
            update();
        };

        (function () {
            const oldresize = window.onresize;
            window.onresize = function (e) {
                const event = window.event || e;
                if (typeof oldresize === 'function' && !oldresize.call(window, event)) {
                    return false;
                }
                if (typeof window.onzoom === 'function') {
                    return window.onzoom.call(window, event);
                }
            };
        })();

        init();
        update();
        const updateInterval = setInterval(update, 30);

        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            clearInterval(updateInterval);
        };
    }, []);

    return (
        <Container ref={containerRef}>
            <Canvas ref={canvasRef} />
        </Container>
    );
}

export default React.memo(StarsCanvas);
