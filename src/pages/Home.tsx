import { GlobalTitle, Main } from "../styles/Styles.tsx";
import styled from "styled-components";
import { FaRegSmileWink } from "react-icons/fa";

const HomeField = styled.div`
    ${Main};
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const HomeContainer = styled.div`
    width: 100%;
    max-width: 720px;
    margin: 0 auto;
    padding: 70px 0;
    color: ${({ theme }) => theme.color.text};
`;

const WelcomeCard = styled.div`
    padding: 40px;
    border-radius: 14px;
    background-color: color-mix(in srgb, ${({ theme }) => theme.color.text} 5%, transparent);
`;

const SubBadge = styled.span`
    display: inline-block;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 1px;
    padding: 4px 10px;
    border-radius: 999px;
    margin-bottom: 16px;
    color: ${({ theme }) => theme.color.primary};
    background-color: color-mix(in srgb, ${({ theme }) => theme.color.primary} 10%, transparent);
`;

const Headline = styled.h2`
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 10px;
`;

const Description = styled.p`
    font-size: 0.95rem;
    color: color-mix(in srgb, ${({ theme }) => theme.color.text} 70%, transparent);
`;

/*
    new Date(): 브라우저에게 "지금 현재 날짜와 시간 정보를 담은 객체 하나 만들어줘!"라고 시키는 기본 명령어.
    .toLocaleDateString("ko-KR", { ... }): 그 날짜 객체에 내장된 번역기 메서드.
    첫 번째 자리 "ko-KR"은 "한국(Korea) 표기법으로 바꿔줘"라는 뜻.
    (만약 "en-US"라고 쓰면 November 20, 2026처럼 미국식으로 나옴.)
*/
function Home() {
    const today = new Date().toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "long",
    });

    return (
        <HomeField>
            <HomeContainer>
                <GlobalTitle>Home</GlobalTitle>
                <WelcomeCard>
                    <SubBadge>{today}</SubBadge>
                    <Headline>
                        DT의 작은 공방입니다. <FaRegSmileWink />
                    </Headline>
                    <Description>
                        상단 메뉴에서 도서 검색, 영화 정보, 커뮤니티 게시판, 실시간 코인 시세를 확인하실 수 있습니다.
                    </Description>
                </WelcomeCard>
            </HomeContainer>
        </HomeField>
    );
}

export default Home;
