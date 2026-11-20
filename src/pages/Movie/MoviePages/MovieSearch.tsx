import styled from "styled-components";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { MovieContainer, MovieDiv } from "./MovieHome.tsx";
import SearchBar from "../MovieComponent/SearchBar.tsx";
import MovieCard from "../MovieComponent/MovieCard.tsx";
import { GlobalTitle } from "../../../styles/Styles.tsx";


const List = styled.ul`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); // repeat(횟수, 크기) Fraction = 비율
    max-width: 1220px;  // auto-fit: 횟수를 숫자로 고정하지 않고, 부모 너비가 허용하는 한 최대한 꽉 채워서 반복
    width: 100%;
    gap: 20px;
    margin: 0 auto;
    padding: 0 20px;
    box-sizing: border-box;
    justify-items: center;
`;

type ApiResponse = {
    Search?: MovieList[];
};

export type MovieList = {
    imdbID: string;
    Poster: string;
    Title: string;
    Year: string;
};

function MovieSearch() {
    const [searchParams] = useSearchParams();
    const keyword = searchParams.get("keyword");

    const [list, setList] = useState<MovieList[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!keyword) return;
        // eslint-disable-next-line
        setList([]);
        setError("");

        fetch(`https://www.omdbapi.com/?apikey=6a0a8eb4&s=${keyword}`)
            .then(res => res.json())
            .then((json: ApiResponse) => setList(json.Search || []))
            .catch((err: unknown) => {
                if (err instanceof Error) {
                    console.log(err.message);
                    setList([]);
                    setError("검색하는데 오류가 발생하였습니다.");
                } else {
                    console.log(err);
                    setList([]);
                    setError("검색하는데 오류가 발생하였습니다.");
                }
            })
            .finally(() => setLoading(false));
    }, [keyword]);

    return (
        <MovieContainer>
            <MovieDiv>
                    <GlobalTitle>검색 키워드 : {keyword}</GlobalTitle>
                    <SearchBar keyword={keyword || ""} />
                    {loading && <p>Loading...</p>}
                    {error && <p>{error}</p>}
            </MovieDiv>
            <List>
                {list.length > 0
                    ? list.map((item, index) => <MovieCard key={index} movie={item} />)
                    : "검색결과가 없습니다."}
            </List>
        </MovieContainer>
    );
}

export default MovieSearch