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
        border-color: #6366f1;
    }
`;