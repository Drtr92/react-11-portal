import styled from "styled-components";
import { Link } from "react-router";

const HeadTop = styled.header`
    display: flex;
    height: 80px;
    background-color: #666;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    flex-shrink: 0;
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
            <LogoBox>임시로고</LogoBox>
            <Nav>
                <Link to={"/"}>Home</Link>
                <Link to={"todo"}>To_do</Link>
                <Link to={"movie"}>Movie</Link>
                <Link to={"book"}>Book</Link>
                <Link to={"coin"}>Coin</Link>
                <Link to={"product"}>Product</Link>
                <Link to={"board"}>Board</Link>
            </Nav>
            <ToggleButton>버튼</ToggleButton>
        </HeadTop>
    );
}

export default Header;
