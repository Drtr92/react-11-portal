import { createContext, useState, useEffect, type ReactNode } from "react";
import { ThemeProvider } from "styled-components";
import { LightTheme, DarkTheme } from "../../styles/theme.ts";

export type ThemeMode = "light" | "dark";

type ThemeContextType = {
    theme: ThemeMode;
    toggleTheme: VoidFunction;
};

// 1. Context 빈 그릇 생성
// eslint-disable-next-line
export const ThemeContext = createContext<ThemeContextType | null>(null);

// 2. 데이터를 채워서 앱 전체에 뿌려주는 Provider 컴포넌트
export function ThemeContextProvider({ children }: { children: ReactNode }) {
    // 첫 렌더링 시 localStorage에서 오브젝트형 스트링 읽어오기
    const [theme, setTheme] = useState<ThemeMode>(() => {
        const saved = localStorage.getItem("theme");
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                return parsed.theme || "light";
            } catch {
                // 예전처럼 그냥 "light"나 "dark" 문자열만 들어있을 때도 안 뻗고 처리!
                // 이전엔 찌꺼기 데이터 로 인해 뻗어버림
                if (saved === "light" || saved === "dark") return saved;
            }
        }
        return "light";
    });

    // theme 값이 바뀔 때마다 localStorage에 오브젝트형 스트링으로 저장
    useEffect(() => {
        localStorage.setItem("theme", JSON.stringify({ theme }));
    }, [theme]);

    // 라이트 <-> 다크 전환 함수
    const toggleTheme = () => {
        setTheme(prev => (prev === "light" ? "dark" : "light"));
    };

    // 현재 문자열("light" | "dark")에 맞는 실제 색상 객체 선택
    const currentTheme = theme === "light" ? LightTheme : DarkTheme;

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <ThemeProvider theme={currentTheme}>{children}</ThemeProvider>
        </ThemeContext.Provider>
    );
}
