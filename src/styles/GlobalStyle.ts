import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    ul, ol {
        list-style: none;
    }
    
    a {
        color: inherit;
        text-decoration: none;
    }

    body {
        background-color: ${({ theme }) => theme.color.background};
        color: ${({ theme }) => theme.color.text};
        transition: background-color 0.25s, color 0.25s; // 놀라워라, 여기서도 트랜지션 적용이 가능하네요!
    }

`;

export default GlobalStyle;
