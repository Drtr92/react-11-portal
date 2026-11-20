import { Link } from "react-router";
import styled from "styled-components";
import type { MovieList } from "../MoviePages/MovieSearch.tsx";

const StyledLink = styled(Link)`
    width: 200px;
    border-radius: 12px;
    padding: 10px;
    background-color: transparent;
    color: ${({ theme }) => theme.color.text};
    display: flex;
    flex-direction: column;
    gap: 8px;
    transition: all 0.3s;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);

    img {
        width: 100%;
        border-radius: 8px;
    }

    span {
        font-size: 0.9rem;
        color: color-mix(in srgb, ${({ theme }) => theme.color.text} 60%, transparent);
    }

    &:hover {
        transform: scale(1.05);
        background-color: color-mix(in srgb, ${({ theme }) => theme.color.text} 12%, transparent);
    }
`;

function MovieCard({ movie }: { movie: MovieList }) {
    return (
        <StyledLink to={`/movie/MovieDetail/${movie.imdbID}`}>
            <img src={movie.Poster} alt={movie.Title} />
            <h3>{movie.Title}</h3>
            <span>{movie.Year}</span>
        </StyledLink>
    );
}

export default MovieCard;
