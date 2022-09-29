import NavLink from 'components/common/NavLink';
import Link from 'next/link';
import { Container, Content, LeftSection, RightSection, AppLink, Logo } from './styles';

interface NavbarProps {}

export const Navbar = ({}: NavbarProps) => {
    return (
        <Container>
            <Content>
                <LeftSection>
                    <Link href="./">
                        <Logo src="/images/rdg_logo.png" />
                    </Link>
                    <NavLink href="./">App</NavLink>
                    <NavLink href="/about">About</NavLink>
                    <NavLink href="/history">History</NavLink>
                </LeftSection>
                <RightSection>
                    <AppLink href="./">Launch App</AppLink>
                </RightSection>
            </Content>
        </Container>
    );
};
