import styled from "styled-components";

export const BoardLoading = styled.div`
    padding: 100px 0;
    text-align: center;
    font-size: 1.1rem;
    color: color-mix(in srgb, ${({ theme }) => theme.color.text} 60%, transparent);
`;

export const BoardContainer = styled.div`
    width: 100%;
    max-width: 720px;
    margin: 0 auto;
    padding: 70px 0;
    color: ${({ theme }) => theme.color.text};
`;
