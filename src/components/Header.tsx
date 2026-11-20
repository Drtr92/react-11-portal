import styled from "styled-components";
import { Link } from "react-router";

const HeadTop = styled.header`
    display: flex;
    height: 80px;
    background-color: #f8f8f8;
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
            <ToggleButton>버튼</ToggleButton>
        </HeadTop>
    );
}

export default Header;
