import { useEffect } from 'react';
import styled from 'styled-components';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const { createSliderWithTooltip } = Slider;
const RCRange = createSliderWithTooltip(Slider.Range);

const StyledRange = styled(RCRange)`
    .rc-slider-tooltip-inner {
        background-color: rgb(98, 24, 236);
        color: #fff;
        border: 1px solid #ff05de;
        font-size: 14px;
        font-weight: bold;
        box-shadow: unset;
        padding: 6px;
        min-height: auto;
        height: auto;
    }

    .rc-slider-tooltip-arrow {
        display: none;
    }
`;

export default function Range({ min, max, value, onChange, tipFormatter }) {
    useEffect(() => {
        const handleMouseUp = () => {
            const handles = document.querySelectorAll?.('.rc-slider-handle');
            handles.forEach(handle => handle?.blur());
        };

        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('touchend', handleMouseUp);

        return () => {
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('touchend', handleMouseUp);
        };
    }, []);

    return (
        <StyledRange
            min={min}
            max={max}
            value={value}
            onChange={onChange}
            tipFormatter={tipFormatter}
            trackStyle={[
                {
                    background: 'linear-gradient(to right, #6a34ff, #ff17b9)',
                    height: 12,
                    cursor: 'pointer',
                },
            ]}
            handleStyle={[
                {
                    backgroundColor: '#916aff',
                    borderColor: '#ff31c1',
                    height: 24,
                    width: 24,
                    marginTop: -6,
                },
                {
                    backgroundColor: '#916aff',
                    borderColor: '#ff31c1',
                    height: 24,
                    width: 24,
                    marginTop: -6,
                },
            ]}
            railStyle={{
                backgroundColor: '#31326e',
                height: 12,
            }}
        />
    );
}
