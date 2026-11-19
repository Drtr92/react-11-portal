import styled from "styled-components";
import SearchBar from "./BookComponent/BookSearchBar.tsx";

/* ================= Styled Components ================= */

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    padding: 40px;
`;

const Title = styled.span`
    font-size: 30px;
    font-weight: 800;
`;

/* ================= Component ================= */

function BookPage() {
    return (
        <Container>
            <Title>Google Books 검색</Title>
            <SearchBar keyword="" />
        </Container>
    );
}

export default BookPage;
