import styled, { css } from 'styled-components';
import Link from 'next/link';
import { shadowOutline } from 'shared/styles';

export const NavItem = css`
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #efeaf8;
    padding: 14px 8px;
    cursor: pointer;
    font-weight: bold;

    &.active {
        color: #888;
    }
`;

export const NavAnchor = styled.a`
    ${NavItem}

    &.active {
        color: #f06000;
        font-weight: bold;
    }
`;

const Button = styled.button`
    background: linear-gradient(45deg, #ad48f0, #ff46ff);
    color: white;
    padding: 8px 32px;
    border-radius: 8px;
    font-weight: bold;
    font-size: 18px;
    cursor: pointer;
    text-decoration: none;
    margin-left: 8px;
    outline: none;

    &:hover,
    &:focus {
        text-decoration: none;
        ${shadowOutline()}
    }
`;

export function NavButton({ onClick, children, disabled, loading, className }) {
    return (
        <Button onClick={onClick} disabled={disabled || loading} className={className}>
            {children}
        </Button>
    );
}

export default function NavLink({ href, as, onClick, children, className }) {
    return (
        <Link href={href} as={as} onClick={onClick} passHref>
            <NavAnchor className={className}>{children}</NavAnchor>
        </Link>
    );
}
