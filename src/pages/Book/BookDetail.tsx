import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { API_KEY, type Book } from "./BookSearch.tsx";
import { GlobalButton } from "../../styles/Styles.tsx";

const Container = styled.div`
    max-width: 720px;
    margin: 0 auto;
    padding: 70px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: ${({ theme }) => theme.color.text};
`;

const TopBar = styled.div`
    width: 100%;
    display: grid;
    align-items: center;
    margin-bottom: 32px;

    & > button:first-child {
        justify-self: start;
    }
`;

const Cover = styled.img`
    width: 200px;
    height: 300px;
    object-fit: cover;
    border-radius: 8px;
    margin-bottom: 24px;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25);
`;

const NoCover = styled.div`
    width: 200px;
    height: 300px;
    border-radius: 8px;
    margin-bottom: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 13px;
    color: color-mix(in srgb, ${({ theme }) => theme.color.text} 50%, transparent);
    background-color: color-mix(in srgb, ${({ theme }) => theme.color.text} 10%, transparent);
`;

const Title = styled.h2`
    font-size: 1.7rem;
    font-weight: 700;
    text-align: center;
    margin-bottom: 10px;
    line-height: 1.4;
`;

const Authors = styled.p`
    font-size: 0.95rem;
    color: color-mix(in srgb, ${({ theme }) => theme.color.text} 65%, transparent);
    margin-bottom: 28px;
    text-align: center;
`;

const Description = styled.div`
    width: 100%;
    padding-top: 24px;
    border-top: 1px solid color-mix(in srgb, ${({ theme }) => theme.color.text} 15%, transparent);
    font-size: 0.98rem;
    line-height: 1.8;
    color: color-mix(in srgb, ${({ theme }) => theme.color.text} 88%, transparent);
    word-break: keep-all;

    p {
        margin-bottom: 12px;
    }
`;

function BookDetail() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [book, setBook] = useState<Book | null>(null);

    useEffect(() => {
        fetch(`https://www.googleapis.com/books/v1/volumes/${id}?key=${API_KEY}`)
            .then(res => res.json())
            .then((json: Book) => setBook(json))
            .catch((err: unknown) => {
                if (err instanceof Error) {
                    console.log(err.message);
                } else {
                    console.log(err);
                }
            });
    }, [id]);

    if (!book) {
        return <Container>loading...</Container>;
    }

    return (
        <Container>
            <TopBar>
                <GlobalButton
                    type="button"
                    onClick={() => {
                        navigate(-1);
                    }}>
                    &larr; 뒤로가기
                </GlobalButton>
            </TopBar>

            {book.volumeInfo.imageLinks ? (
                <Cover src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} />
            ) : (
                <NoCover>No cover</NoCover>
            )}

            <Title>{book.volumeInfo.title}</Title>
            <Authors>{book.volumeInfo.authors?.join(", ")}</Authors>
            <Description dangerouslySetInnerHTML={{ __html: book.volumeInfo.description || "" }} />
        </Container>
    );
}

export default BookDetail;
