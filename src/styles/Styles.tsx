import styled from "styled-components";

export const Main = styled.main`
    flex: 1;
`;

export const GlobalInput = styled.input`
    flex: 1;
    padding: 12px 16px;
    font-size: 1rem;
    border: 2px solid #e1e1e1;
    border-radius: 8px;
    outline: none;
    transition: border-color 0.2s;

    &:focus {
        border-color: #444;
    }
    &:hover {
        border-color: #444;
        background-color: #efefef;
    }
`;

export const GlobalButton = styled.button`
    padding: 12px 20px;
    background-color: #777;
    color: white;
    font-weight: 600;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
        background-color: #444;
    }
`;

export const GlobalTitle = styled.h1`
    font-size: 1.8rem;
    color: #333333;
    margin-bottom: 20px;
    text-align: center;
`;