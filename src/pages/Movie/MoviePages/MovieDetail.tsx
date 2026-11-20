import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import SearchBar from "../MovieComponent/SearchBar.tsx";
import { MovieContainer } from "./MovieHome.tsx";
import type { MovieList } from "./MovieSearch.tsx";
import { GlobalButton } from "../../../styles/Styles.tsx";

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
                <GlobalButton
                    onClick={() => {
                        navigate(-1);
                    }}>
                    &larr; 뒤로가기
                </GlobalButton>
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