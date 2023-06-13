import { useEffect, useRef } from 'react';
import Jazzicon from '@metamask/jazzicon';
import { Container, Icon } from './styles';

interface IdenticonProps {
    address: string;
    className?: string;
}

export const Identicon = ({ address, className }: IdenticonProps) => {
    const iconRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!!address && iconRef.current) {
            iconRef.current.innerHTML = '';
            iconRef.current.appendChild(Jazzicon(72, parseInt(address.slice(2, 10), 16)));
        }
    }, [address]);

    return (
        <Container className={className}>
            <Icon ref={iconRef} />
        </Container>
    );
};
