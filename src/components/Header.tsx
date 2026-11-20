import styled from "styled-components";
import { Link } from "react-router";
import {ThemeContext} from "../contexts/theme/ThemeContexts.tsx";
import {useContext} from "react";
import { FaMoon, FaSun } from "react-icons/fa";

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
    width: 240px;
    font-weight: 900;
    font-size: 30px;
`;

const ButtonBox = styled.div`
    display: flex;
    width: 240px;
    flex-direction: row-reverse;
`;

const ToggleButton = styled.button`
    font-weight: 900;
    font-size: 20px;
    background-color: transparent;
    color: ${({ theme }) => theme.color.text};
    border: none;
    cursor: pointer;
`;

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
            <ButtonBox>
                <ToggleButton type="button" onClick={toggleTheme}>
                    {theme === "light" ? <FaMoon /> : <FaSun />}
                </ToggleButton>
            </ButtonBox>
        </HeadTop>
    );
}

export default Header;
