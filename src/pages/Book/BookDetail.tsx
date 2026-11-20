import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { API_KEY, type Book } from "./BookSearch.tsx";
import { GlobalButton } from "../../styles/Styles.tsx";

const Container = styled.div`
    max-width: 720px;
    margin: 0 auto;
    padding: 40px 24px 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: ${({ theme }) => theme.color.text};
`;

const TopBar = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    margin-bottom: 24px;
`;

const Cover = styled.img`
    width: 200px;
    height: 300px;
    object-fit: cover;
    border-radius: 8px;
    margin-bottom: 32px;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25);
`;

const NoCover = styled.div`
    width: 200px;
    height: 300px;
    border-radius: 8px;
    margin-bottom: 32px;
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
    word-break: keep-all;  // keep-all을 주면: 영어처럼 띄어쓰기(어절) 단위로 통째로 다음 줄로 넘겨줌.

    /*
    Google Books API의 description 데이터 안에는 종종
    <p>첫 번째 문단...</p><p>두 번째 문단...</p> 형태로 HTML 태그가 직접 담겨서 내려온다.
    styled-components는 일반 CSS처럼 중첩 문법을 지원하기 때문에,
    Description 안에 p { ... }라고 적어두면 "Description 내부에 있는 모든 <p> 태그"에만 해당 스타일이 적용.
    글로벌 CSS 리셋(margin: 0) 때문에 문단끼리 다닥다닥 붙어 보일 수 있는 걸 막고,
    문단 사이에 12px씩 숨통을 틔워주는 역할임.
    */
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

            <Title>{book.volumeInfo.title}</Title>
            {book.volumeInfo.imageLinks ? (
                <Cover src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} />
            ) : (
                <NoCover>No cover</NoCover>
            )}
            <Authors>{book.volumeInfo.authors?.join(", ")}</Authors>
            <Description dangerouslySetInnerHTML={{ __html: book.volumeInfo.description || "" }} />
        </Container>
    );
}

export default BookDetail;
