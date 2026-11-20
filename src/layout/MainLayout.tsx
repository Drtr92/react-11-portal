import styled from 'styled-components';
import { Outlet } from "react-router";
import Header from "../components/Header.tsx";

const Wrap = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    height: 100%;
`;

function MainLayout() {
    return (
        <Wrap>
            <Header />
            <Outlet />
        </Wrap>
    );
}

export default MainLayout;