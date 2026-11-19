import styled from 'styled-components';
import { Outlet } from "react-router";

const Wrap = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;

function MainLayout() {
    return (
        <Wrap>
            <header />
            <Outlet />
        </Wrap>
    );
}

export default MainLayout;