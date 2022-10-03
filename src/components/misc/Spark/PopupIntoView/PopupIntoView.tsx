import { useRef } from 'react';
import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';

const PopupContainer = styled(motion.div)``;

interface PopupIntoViewProps {
    children: React.ReactNode;
    delay?: number;
    duration?: number;
    distance?: number;
    scale?: number;
    once?: boolean;
    margin?: string;
    amount?: number | 'some' | 'all';
}

export const PopupIntoView = ({
    children,
    delay = 0,
    duration = 1,
    distance = 32,
    scale = 1,
    once = true,
    margin = '-200px 0px',
    amount = 'all',
}: PopupIntoViewProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once, margin, amount });

    return (
        <PopupContainer
            ref={ref}
            style={{ opacity: 0, translateY: distance, scale }}
            animate={isInView && { opacity: 1, translateY: 0, scale: 1 }}
            transition={{
                type: 'tween',
                duration,
                ease: 'easeOut',
                delay,
            }}
        >
            {children}
        </PopupContainer>
    );
};
