import styled from 'styled-components';
import { motion } from 'framer-motion';
import Grid from './Grid';

const Sun = styled(motion.div)`
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background-color: #ffa56a;
    background: linear-gradient(to bottom, #ffde25 20%, #ff8f32, #ff00d4 80%);
    position: absolute;
    bottom: 240px;
    left: calc(50% - 60px);
    transition: all 0.1s linear;
    box-shadow: 0 0 10px 2px #ff00d4;
`;

const City = styled.div`
    width: 100%;
    height: 200px;
    position: absolute;
    bottom: 140px;
    background: url('/images/decorations/city_skyline.png');
    background-size: 600px;
    background-repeat: repeat-x;
`;

const SunGradient = styled(motion.div)`
    width: 100%;
    height: 400px;
    position: absolute;
    bottom: 140px;
    background: radial-gradient(#e66465, #9198e500);
    transition: all 0.1s linear;
    mask-image: -webkit-gradient(
        linear,
        left bottom,
        left top,
        from(rgba(0, 0, 0, 0.55)),
        to(rgba(0, 0, 0, 0))
    );
    -webkit-mask-image: -webkit-gradient(
        linear,
        left bottom,
        left top,
        from(rgba(0, 0, 0, 0.55)),
        to(rgba(0, 0, 0, 0))
    );
`;

const SunGradientCity = styled(motion.div)`
    width: 100%;
    height: 200px;
    position: absolute;
    bottom: 0px;
    background: radial-gradient(#e66465, #9198e500);
    transition: all 0.1s linear;
    mask-image: -webkit-gradient(
        linear,
        left bottom,
        left top,
        from(rgba(0, 0, 0, 0)),
        to(rgba(0, 0, 0, 0.3))
    );
    -webkit-mask-image: -webkit-gradient(
        linear,
        left bottom,
        left top,
        from(rgba(0, 0, 0, 0)),
        to(rgba(0, 0, 0, 0.3))
    );
`;

export { SunGradient, SunGradientCity, Sun, City, Grid };
