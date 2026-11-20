import { Link, useParams } from "react-router";
import { useEffect, useState } from "react";
import type { BoardPost } from "./BoardComponent/BoardPost.ts";
import styled from "styled-components";
import { BoardContainer, BoardLoading } from "./BoardComponent/BoardGlobalStyles.ts";
import { GlobalTitle } from "../../styles/Styles.tsx";

const Article = styled.article`
    padding-top: 40px;
`;

const BackLink = styled(Link)`
    color: #666;
    font-size: 14px;
    margin-bottom: 32px;
    padding: 8px 12px;
    border-radius: 6px;
    background-color: #f1f3f5;
    border: 1px solid #666;

    &:hover {
        background-color: #e9ecef;
        color: #0077ff;
    }
`;

const Meta = styled.div`
    color: #888;
    margin-bottom: 40px;
`;

const Body = styled.div`
    font-size: 1.15rem;
    line-height: 1.8;
    white-space: pre-wrap; /* '\\n'이라고 하는 줄바꿈 기호를 줄바꿈 처리로 사용하겠다 */
`;

function BoardDetail() {
    const { id } = useParams(); // id의 타입은 string | undefined

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
            <BackLink to={"/board"}>&larr; 목록으로 돌아가기</BackLink>

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
