import SearchBar from "../MovieComponent/SearchBar.tsx";
import styled from "styled-components";

// eslint-disable-next-line
export const MovieContainer = styled.div`
    padding: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
// eslint-disable-next-line
export const MovieDiv = styled.div`
    display: flex;
    gap: 20px;
    margin: 80px auto;
    flex-direction: column;
    align-items: center;
`;

function MovieHome() {
    return (
        <MovieContainer>
            <MovieDiv>
                <h1>OMD Flicks</h1>
                <SearchBar keyword={""} />
            </MovieDiv>
        </MovieContainer>
    );
}

export default MovieHome;