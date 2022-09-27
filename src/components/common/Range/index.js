import { useEffect } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const { createSliderWithTooltip } = Slider;
const RCRange = createSliderWithTooltip(Slider.Range);

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
        <RCRange
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
