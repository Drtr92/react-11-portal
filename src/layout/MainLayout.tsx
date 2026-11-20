import styled from 'styled-components';
import { Outlet } from "react-router";
import Header from "../components/Header.tsx";

const Wrap = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: hidden;
    background-color: #f8f8f8;
`;

const OutletContainer = styled.div`
    flex: 1;            /* Header를 제외한 나머지 화면 높이를 정확히 차지 */
    min-height: 0;      /* 자식 요소가 넘칠 때 부모를 밀어내지 않고 스크롤되도록 필수 설정 */
    overflow-y: auto;   /* BEAUTY처럼 긴 페이지가 들어오면 여기(Outlet)에만 스크롤 생성! */
`;

function MainLayout() {
    return (
        <Wrap>
            <Header />
            <OutletContainer>
                <Outlet />
            </OutletContainer>
        </Wrap>
    );
}

export default MainLayout;