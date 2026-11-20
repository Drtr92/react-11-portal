import styled from "styled-components";

export const Main = styled.main`
    flex: 1;
`;

export const GlobalInput = styled.input`
    flex: 1;
    padding: 12px 16px;
    font-size: 1rem;
    background-color: ${({ theme }) => theme.color.background};
    color: ${({ theme }) => theme.color.text};
    border: 2px solid rgba(128, 128, 128, 0.3);
    border-radius: 8px;
    outline: none;

    &:focus {
        border-color: ${({ theme }) => theme.color.text};
    }
    &:hover {
        border-color: ${({ theme }) => theme.color.text};
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
    color: ${({ theme }) => theme.color.text};
    margin-bottom: 20px;
    text-align: center;
    transition: color 0.25s;
`;
