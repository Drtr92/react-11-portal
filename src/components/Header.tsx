import styled from 'styled-components';

const HeadTop = styled.header`
    display: flex;
    height: calc(100dvh / 11);
`;

const Nav = styled.nav`
    display: flex;
`;

const LogoBox = styled.div`
    display: flex;
`;

const ToggleButton = styled.button``;

function Header() {
    return (
        <HeadTop>
            <LogoBox></LogoBox>
            <Nav></Nav>
            <ToggleButton></ToggleButton>
        </HeadTop>
    );
};

export default Header;