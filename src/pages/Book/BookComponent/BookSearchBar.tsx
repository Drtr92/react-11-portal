import { type SubmitEvent, type ChangeEvent, useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { GlobalButton, GlobalInput } from "../../../styles/Styles.tsx";

const Form = styled.form`
    display: flex;
    flex-direction: row;
    width: 100%;
    gap: 10px;
    margin-bottom: 10px;
`;

function BookSearchBar({ keyword }: { keyword?: string }) {
    const [inputKeyword, setInputKeyword] = useState(keyword || "");
    const navigate = useNavigate();

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) =>
        setInputKeyword(event.target.value);

    const onSubmitHandler = (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        const k = inputKeyword.trim();
        if (!k) return;

        navigate(`/book/bookSearch?keyword=${encodeURIComponent(k)}`);
    };

    return (
        <Form onSubmit={onSubmitHandler}>
            <GlobalInput onChange={onChangeHandler} value={inputKeyword} placeholder={"Search google books..."} />
            <GlobalButton type="submit">검색</GlobalButton>
        </Form>
    );
}

export default BookSearchBar;
