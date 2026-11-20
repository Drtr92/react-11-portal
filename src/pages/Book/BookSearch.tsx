import { Link, useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import SearchBar from "./BookComponent/BookSearchBar.tsx";
import { GlobalTitle } from "../../styles/Styles.tsx";

export type Book = {
    id: string;
    volumeInfo: {
        title: string;
        authors?: string[];
        description?: string;
        imageLinks?: {
            thumbnail: string;
        };
    };
};

type ApiResponse = {
    items?: Book[];
};

export const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

const Container = styled.div`
    max-width: 720px;
    margin: 0 auto;
    padding: 70px 0;
    color: ${({ theme }) => theme.color.text};
`;

const SearchBarWrapper = styled.div`
    margin-bottom: 24px;
`;

const Message = styled.div`
    padding: 40px 0;
    color: color-mix(in srgb, ${({ theme }) => theme.color.text} 60%, transparent);
    text-align: center;
`;

const BookLink = styled(Link)`
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 14px 16px;
    border-radius: 10px;
    background-color: transparent;
    margin-bottom: 12px;
    border: 2px solid color-mix(in srgb, ${({ theme }) => theme.color.text} 15%, transparent);
    transition: all 0.2s;
    color: ${({ theme }) => theme.color.text};
    text-decoration: none;

    &:hover {
        background-color: color-mix(in srgb, ${({ theme }) => theme.color.text} 10%, transparent);
        border-color: color-mix(in srgb, ${({ theme }) => theme.color.text} 30%, transparent);
    }
`;

const Cover = styled.img`
    width: 60px;
    height: 90px;
    object-fit: cover;
    border-radius: 4px;
    flex-shrink: 0;
`;

const NoCover = styled.div`
    width: 60px;
    height: 90px;
    flex-shrink: 0;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 11px;
    color: color-mix(in srgb, ${({ theme }) => theme.color.text} 50%, transparent);
    background-color: color-mix(in srgb, ${({ theme }) => theme.color.text} 10%, transparent);
`;

const Title = styled.div`
    font-weight: 600;
    margin-bottom: 4px;
`;

const Authors = styled.div`
    font-size: 13px;
    color: color-mix(in srgb, ${({ theme }) => theme.color.text} 65%, transparent);
`;

function BookSearch() {
    const [searchParams] = useSearchParams();
    const keyword = searchParams.get("keyword");

    const [list, setList] = useState<Book[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!keyword) return;
        //eslint-disable-next-line
        setLoading(true);

        fetch(
            `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(keyword)}&maxResults=20&key=${API_KEY}`,
        )
            .then(res => res.json())
            .then((json: ApiResponse) => setList(json.items || []))
            .catch((err: unknown) => {
                if (err instanceof Error) {
                    console.log(err.message);
                } else {
                    console.log(err);
                }
            })
            .finally(() => setLoading(false));
    }, [keyword]);

    return (
        <Container>
            <GlobalTitle>검색결과 : {keyword}</GlobalTitle>
            <SearchBarWrapper>
                <SearchBar keyword={keyword || ""} />
            </SearchBarWrapper>

            {loading ? (
                <Message>로딩 중입니다...</Message>
            ) : list.length === 0 ? (
                <Message>검색 결과가 없습니다.</Message>
            ) : (
                list.map(item => (
                    <BookLink key={item.id} to={`/book/bookDetail/${item.id}`}>
                        {item.volumeInfo.imageLinks ? (
                            <Cover
                                src={item.volumeInfo.imageLinks.thumbnail}
                                alt={item.volumeInfo.title}
                            />
                        ) : (
                            <NoCover>No cover</NoCover>
                        )}

                        <div>
                            <Title>{item.volumeInfo.title}</Title>
                            <Authors>{item.volumeInfo.authors?.join(", ")}</Authors>
                        </div>
                    </BookLink>
                ))
            )}
        </Container>
    );
}

export default BookSearch;
