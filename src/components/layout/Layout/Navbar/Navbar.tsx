import NavLink from 'components/common/NavLink';
import { Container, Content, LeftSection, RightSection, AppLink, Logo } from './styles';

interface NavbarProps {}

export const Navbar = ({}: NavbarProps) => {
    return (
        <Container>
            <Content>
                <Logo src="/images/rdg_logo.png" />
                <LeftSection>
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
