import styled, { css } from 'styled-components';
import Link from 'next/link';

export const NavItem = css`
    height: 54px;
    line-height: 58px;
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #e0d1ee;
    padding: 0px 8px;
    margin: 0px 4px;
    cursor: pointer;
    font-weight: bold;

    &:hover {
        text-decoration: underline;
    }

    @media (max-width: 768px) {
    }

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
    background-color: #613af0;
    color: white;
    padding: 8px 32px;
    border-radius: 10px;
    font-weight: bold;
    font-size: 18px;
    cursor: pointer;
    text-decoration: none;
    margin-left: 8px;

    &:hover {
        background-color: #502adb;
    }
`;

export function NavButton({ onClick, children, disabled, loading, className }) {
    return (
        <Button onClick={onClick} disabled={disabled || loading} className={className}>
            {children}
        </Button>
    );
}

export default function NavLink({ href, as, onClick, children }) {
    return (
        <Link href={href} as={as} onClick={onClick} passHref>
            <NavAnchor>{children}</NavAnchor>
        </Link>
    );
}
