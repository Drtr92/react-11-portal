import SearchBar from "../MovieComponent/SearchBar.tsx";
import styled from "styled-components";

// eslint-disable-next-line
export const MovieContainer = styled.div`
    padding: 30px;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

function MovieHome() {
    return (
        <MovieContainer>
            <div>
                <h1>OMD Flicks</h1>
                <SearchBar keyword={""} />
            </div>
        </MovieContainer>
    );
}

export default MovieHome;