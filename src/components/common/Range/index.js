import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const { createSliderWithTooltip } = Slider;
const RCRange = createSliderWithTooltip(Slider.Range);

export default function Range({ min, max, value, onChange, tipFormatter }) {
    return (
        <RCRange
            min={min}
            max={max}
            value={value}
            onChange={onChange}
            tipFormatter={tipFormatter}
            trackStyle={[{ backgroundColor: '#7339fc', height: 12, cursor: 'pointer' }]}
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
                backgroundColor: '#ff31c1',
                background: 'linear-gradient(to right, #916aff, #ff31c1)',
                height: 12,
            }}
        />
    );
}
