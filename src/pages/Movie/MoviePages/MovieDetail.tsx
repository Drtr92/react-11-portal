import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import SearchBar from "../MovieComponent/SearchBar.tsx";
import { MovieContainer } from "./MovieHome.tsx";
import styled from "styled-components";
import type { MovieList } from "./MovieSearch.tsx";

// eslint-disable-next-line
export const BackBtn = styled.button`
    display: block;
    margin-bottom: 20px;
    background-color: #ff5959;
    border: none;
    color: white;
    cursor: pointer;
    padding: 10px;
    border-radius: 6px;

    &:hover {
        background-color: #ffaaaa;
    }
`;

type MovieDetails = MovieList & {
    Released: string;
    Genre: string;
    Director: string | string[];
    Plot: string;
    Type: string;
};

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
        <MovieContainer>
            <div>
                <BackBtn
                    onClick={() => {
                        navigate(-1);
                    }}>
                    &larr; 뒤로가기
                </BackBtn>
                <SearchBar keyword={""} />
                <div></div>
            </div>
            {detailDescription.Poster ? (
                <img src={detailDescription.Poster} alt={detailDescription.Title} />
            ) : (
                <div>"No image"</div>
            )}
            <div>{detailDescription.Title}</div>
            <div>
                <strong>Year</strong>
                {detailDescription.Year}
            </div>
            <div>
                <strong>Released</strong>
                {detailDescription?.Released}
            </div>
            <div>
                <strong>Genre</strong>
                {detailDescription?.Genre}
            </div>
            <div>
                <strong>Director</strong>
                {detailDescription?.Director}
            </div>
            <div>
                <strong>Plot</strong>
                {detailDescription?.Plot}
            </div>
        </MovieContainer>
    );
}

export default MovieDetail;