import "styled-components";

declare module "styled-components" {
    export interface DefaultTheme {
        color: {
            background: string;
            text: string;
            primary: string; // 주요한. 사이트의 메인 색상
        };
    }
}
