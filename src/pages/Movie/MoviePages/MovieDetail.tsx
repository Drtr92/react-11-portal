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