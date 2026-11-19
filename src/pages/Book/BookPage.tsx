import styled from "styled-components";
import SearchBar from "./BookComponent/BookSearchBar.tsx";
import { GlobalTitle } from "../../styles/Styles.tsx";

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
`;

function BookPage() {
    return (
        <Container>
            <BooksContainer>
                <GlobalTitle>Google Books 검색</GlobalTitle>
                <SearchBar keyword="" />
            </BooksContainer>
        </Container>
    );
}

export default BookPage;
