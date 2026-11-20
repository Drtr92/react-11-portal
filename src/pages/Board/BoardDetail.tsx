import { Link, useParams } from "react-router";
import { useEffect, useState } from "react";
import type { BoardPost } from "./BoardComponent/BoardPost.ts";
import styled from "styled-components";
import { BoardContainer, BoardLoading } from "./BoardComponent/BoardGlobalStyles.ts";
import { GlobalTitle } from "../../styles/Styles.tsx";

const BackLink = styled(Link)`
    display: inline-flex;
    align-items: center;
    color: ${({ theme }) => theme.color.text};
    font-size: 14px;
    text-decoration: none;
    margin-bottom: 32px;
    padding: 14px;
    border-radius: 6px;
    background-color: color-mix(in srgb, ${({ theme }) => theme.color.text} 15%, transparent);
    transition: background-color,color 0.2s;
    &:hover {
        background-color: color-mix(in srgb, ${({ theme }) => theme.color.text} 35%, transparent);
    }
`;

const Article = styled.article`
    width: 100%;
`;

const Meta = styled.div`
    font-size: 0.9rem;
    color: color-mix(in srgb, ${({ theme }) => theme.color.text} 60%, transparent);
    padding-bottom: 24px;
    margin-bottom: 28px;
    border-bottom: 1px solid color-mix(in srgb, ${({ theme }) => theme.color.text} 15%, transparent);
`;

const Body = styled.div`
    font-size: 1.05rem;
    line-height: 1.8;
    color: color-mix(in srgb, ${({ theme }) => theme.color.text} 90%, transparent);
    white-space: pre-wrap;
    word-break: keep-all;
`;

function BoardDetail() {
    const { id } = useParams();

    const [post, setPost] = useState<BoardPost | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .then(res => res.json())
            .then((json: BoardPost) => {
                setPost(json);
                setLoading(false);
            })
            .catch((err: unknown) => {
                if (err instanceof Error) {
                    console.log(err.message);
                } else {
                    console.log(err);
                }
            });
    }, [id]);

    if (loading) {
        return <BoardLoading>본문을 불러오는 중입니다...</BoardLoading>;
    }

    if (!post) {
        return <BoardLoading>존재하지 않는 게시글입니다.</BoardLoading>;
    }

    return (
        <BoardContainer>
            <BackLink to={"/board"}>&larr; 목록으로</BackLink>

            <Article>
                <GlobalTitle>{post.title}</GlobalTitle>
                <Meta>
                    <span>게시물 번호 : {post.id}</span>
                    <span style={{ margin: "0 12px" }}>|</span>
                    <span>작성자 : {post.userId}</span>
                </Meta>
                <Body>{post.body}</Body>
            </Article>
        </BoardContainer>
    );
}

export default BoardDetail;
