import { useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

const Container = styled.div`
    display: flex;
    height: 100vh;
    justify-content: center;
    align-items: center;
`;

export default function Custom404() {
    const router = useRouter();

    useEffect(() => {
        router.push('/');
    }, []);

    return <Container></Container>;
}
