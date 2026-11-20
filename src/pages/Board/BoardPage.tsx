import { useEffect, useState } from "react";
import { Link } from "react-router";
import { BoardContainer, BoardLoading } from "./BoardComponent/BoardGlobalStyles.ts";
import styled from "styled-components";
import type { BoardPost } from "./BoardComponent/BoardPost.ts";
import { GlobalTitle } from "../../styles/Styles.tsx";

const BoardTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    border-top: 2px solid color-mix(in srgb, ${({ theme }) => theme.color.text} 25%, transparent);
    color: ${({ theme }) => theme.color.text};

    th,
    td {
        padding: 16px 14px;
    }

    th {
        background-color: color-mix(in srgb, ${({ theme }) => theme.color.text} 6%, transparent);
        font-size: 14px;
        font-weight: 600;
        color: color-mix(in srgb, ${({ theme }) => theme.color.text} 85%, transparent);
        border-bottom: 1px solid
            color-mix(in srgb, ${({ theme }) => theme.color.text} 20%, transparent);
        text-align: center;
    }

    td {
        border-bottom: 1px solid
            color-mix(in srgb, ${({ theme }) => theme.color.text} 12%, transparent);
    }
`;

const TableRow = styled.tr`
    transition: background-color 0.2s;

    &:hover {
        background-color: color-mix(in srgb, ${({ theme }) => theme.color.text} 8%, transparent);
    }
`;

const IdCell = styled.td`
    width: 80px;
    text-align: center;
    color: color-mix(in srgb, ${({ theme }) => theme.color.text} 55%, transparent);
`;

const TitleCell = styled.td`
    text-align: left;
`;

const UserIdCell = styled.td`
    width: 100px;
    text-align: center;
    color: color-mix(in srgb, ${({ theme }) => theme.color.text} 65%, transparent);
`;

const StyledLink = styled(Link)`
    color: ${({ theme }) => theme.color.text};
    text-decoration: none;
    transition: opacity 0.2s;

    &:hover {
        text-decoration: underline;
        opacity: 0.75;
    }
`;

function BoardPage() {
    const [list, setList] = useState<BoardPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/posts")
            .then(res => res.json())
            .then((json: BoardPost[]) => {
                setList(json);
                setLoading(false);
            })
            .catch((err: unknown) => {
                if (err instanceof Error) {
                    console.log(err.message);
                } else {
                    console.log("알 수 없는 에러 : " + err);
                }
            });
    }, []);

    if (loading) {
        return <BoardLoading>데이터를 로드 중입니다...</BoardLoading>;
    }

    return (
        <BoardContainer>
            <GlobalTitle>커뮤니티 게시판</GlobalTitle>
            <BoardTable>
                <thead>
                    <tr>
                        <IdCell as={"th"}>번호</IdCell>
                        <th>제목</th>
                        <th>작성자 ID</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map(item => (
                        <TableRow key={item.id}>
                            <IdCell>{item.id}</IdCell>
                            <TitleCell>
                                <StyledLink to={`boardDetail/${item.id}`}>{item.title}</StyledLink>
                            </TitleCell>
                            <UserIdCell>{item.userId}</UserIdCell>
                        </TableRow>
                    ))}
                </tbody>
            </BoardTable>
        </BoardContainer>
    );
}

export default BoardPage;
