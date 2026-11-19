import { Main } from "../styles/Styles.tsx";
import styled from "styled-components";

const HomeField = styled.div`
    ${Main};
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
`;

const HomeContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 80px auto; // 임시 수치
`;

function Home() {
    return (
        <HomeField>
            <HomeContainer>home</HomeContainer>
        </HomeField>
    );
}

export default Home;