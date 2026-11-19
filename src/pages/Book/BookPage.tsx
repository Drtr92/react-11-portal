import styled from "styled-components";
import SearchBar from "./BookComponent/BookSearchBar.tsx";

/* ================= Styled Components ================= */

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
`;

const BooksContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 400px;
    margin: 80px auto;
    padding: 30px;
    gap: 20px;
`;

const Title = styled.span`
    font-size: 30px;
    font-weight: 800;
`;

/* ================= Component ================= */

function BookPage() {
    return (
        <Container>
            <BooksContainer>
                <Title>Google Books 검색</Title>
                <SearchBar keyword="" />
            </BooksContainer>
        </Container>
    );
}

export default BookPage;
