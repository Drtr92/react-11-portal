import { type SubmitEvent, type ChangeEvent, useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";

const Form = styled.form`
    display: flex;
    flex-direction: row;
    width: 100%;
    gap: 10px;
`;

const Input = styled.input`
    flex: 1;
    padding: 12px;
    border-radius: 8px;
    border: 1px solid #999;
`;

const Button = styled.button`
    padding: 12px 18px;
    border: none;
    background-color: black;
    color: white;
    border-radius: 8px;
    cursor: pointer;
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
            <Input onChange={onChangeHandler} value={inputKeyword} />
            <Button type="submit">검색</Button>
        </Form>
    );
}

export default BookSearchBar;
