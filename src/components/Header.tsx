import styled from "styled-components";
import { Link } from "react-router";
import {ThemeContext} from "../contexts/theme/ThemeContexts.tsx";
import {useContext} from "react";

const HeadTop = styled.header`
    display: flex;
    height: 80px;
    background-color: ${({ theme }) => theme.color.background};
    color: ${({ theme }) => theme.color.text};
    justify-content: space-between;
    align-items: center;
    padding: 20px 60px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
`;

const Nav = styled.nav`
    display: flex;
    gap: 30px;
`;

const LogoBox = styled.div`
    display: flex;
    font-weight: 900;
    font-size: 30px;
`;

const ToggleButton = styled.button``;

function Header() {
    const context = useContext(ThemeContext);
    if (!context) return null;

    const { theme, toggleTheme } = context;

    return (
        <HeadTop>
            <LogoBox>DT's DashBoard</LogoBox>
            <Nav>
                <Link to={"/"}>Home</Link>
                <Link to={"todo"}>To_do</Link>
                <Link to={"movie"}>Movie</Link>
                <Link to={"book"}>Book</Link>
                <Link to={"coin"}>Coin</Link>
                <Link to={"board"}>Board</Link>
                <Link to={"product"}>Product</Link>
            </Nav>
            <ToggleButton type="button" onClick={toggleTheme}>
                {theme === "light" ? "다크 모드로" : "라이트 모드로"}
            </ToggleButton>
        </HeadTop>
    );
}

export default Header;
