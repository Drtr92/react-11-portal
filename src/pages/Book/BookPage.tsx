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
    margin: 40px auto;
    padding: 30px;
`;

function BookPage() {
    return (
        <Container>
            <BooksContainer>
                <GlobalTitle>Book</GlobalTitle>
                <SearchBar keyword="" />
            </BooksContainer>
        </Container>
    );
}

export default BookPage;
