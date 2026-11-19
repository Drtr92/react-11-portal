import styled from "styled-components";
import { Link } from "react-router";

const HeadTop = styled.header`
    display: flex;
    height: calc(100dvh / 11);
    min-height: 100px;
    background-color: tomato;
    justify-content: space-between;
    align-items: center;
`;

const Nav = styled.nav`
    display: flex;
    gap: 30px;
`;

const LogoBox = styled.div`
    display: flex;
`;

const ToggleButton = styled.button``;

function Header() {
    return (
        <HeadTop>
            <LogoBox>로고</LogoBox>
            <Nav>
                <Link to={"/"}>Home</Link>
                <Link to={"todo"}>To_do</Link>
                <Link to={"coin"}>Coin</Link>
                <Link to={"movie"}>Movie</Link>
                <Link to={"product"}>Product</Link>
            </Nav>
            <ToggleButton>버튼</ToggleButton>
        </HeadTop>
    );
}

export default Header;
