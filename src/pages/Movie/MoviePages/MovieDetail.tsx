import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import SearchBar from "../MovieComponent/SearchBar.tsx";
import type { MovieList } from "./MovieSearch.tsx";
import { GlobalButton } from "../../../styles/Styles.tsx";
import styled from "styled-components";

type MovieDetails = MovieList & {
    Released: string;
    Genre: string;
    Director: string | string[];
    Plot: string;
    Type: string;
};

const Container = styled.div`
    max-width: 720px;
    margin: 0 auto;
    padding: 70px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: ${({ theme }) => theme.color.text};
`;

const TopBar = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    /*
        auto (가운데 열): 내부에 들어간 콘텐츠(텍스트, 이미지, 버튼 등)의 크기만큼만 너비를 차지합니다.
        콘텐츠가 길어지면 늘어나고, 짧아지면 줄어듭니다.
        1fr (양옆 열): fr은 Fraction(비율, 파편)의 약자입니다.
        전체 너비에서 auto가 차지한 공간을 빼고, 남은 여유 공간을 1 : 1 비율로 똑같이 나눠 가집니다.
    */
    align-items: center;
    margin-bottom: 32px;

    & > button:first-child {
        justify-self: start;
    }
`;

const Poster = styled.img`
    width: 220px;
    height: 330px;
    object-fit: cover;
    border-radius: 10px;
    margin-bottom: 24px;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25);
`;

const Title = styled.h2`
    font-size: 1.7rem;
    font-weight: 700;
    text-align: center;
    margin-bottom: 24px;
`;

const InfoList = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding-top: 24px;
    border-top: 1px solid color-mix(in srgb, ${({ theme }) => theme.color.text} 15%, transparent);
`;

const InfoRow = styled.div`
    display: flex;
    gap: 12px;
    font-size: 0.95rem;
    word-break: keep-all;

    strong {
        width: 85px;
        flex-shrink: 0;
        color: color-mix(in srgb, ${({ theme }) => theme.color.text} 60%, transparent);
    }
`;

function MovieDetail() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [detailDescription, setDetailDescription] = useState<MovieDetails | null>(null);

    useEffect(() => {
        fetch(`https://www.omdbapi.com/?apikey=6a0a8eb4&i=${id}&plot=full`)
            .then(res => res.json())
            .then(json => setDetailDescription(json))
            .catch(err => console.log(err));
    }, [id]);

    if (!detailDescription) return <p>Loading...</p>;

    return (
        <Container>
            <TopBar>
                <GlobalButton
                    type="button"
                    onClick={() => {
                        navigate(-1);
                    }}>
                    &larr; 뒤로가기
                </GlobalButton>
                <SearchBar keyword={""} />
                <div />
            </TopBar>

            <Poster src={detailDescription.Poster} alt={detailDescription.Title} />

            <Title>{detailDescription.Title}</Title>

            <InfoList>
                <InfoRow>
                    <strong>Year</strong>
                    <span>{detailDescription.Year}</span>
                </InfoRow>
                <InfoRow>
                    <strong>Released</strong>
                    <span>{detailDescription.Released}</span>
                </InfoRow>
                <InfoRow>
                    <strong>Genre</strong>
                    <span>{detailDescription.Genre}</span>
                </InfoRow>
                <InfoRow>
                    <strong>Director</strong>
                    <span>{detailDescription.Director}</span>
                </InfoRow>
                <InfoRow>
                    <strong>Plot</strong>
                    <span>{detailDescription.Plot}</span>
                </InfoRow>
            </InfoList>
        </Container>
    );
}

export default MovieDetail;