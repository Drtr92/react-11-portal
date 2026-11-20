import styled from "styled-components";

const CoinPercentStyles = styled.div<{ $value: string }>`
    font-weight: 600;
    color: ${({ $value }) => {
        if ($value.startsWith("-")) return "#0051c7"; // 하락: 업비트 파랑
        if ($value === "0" || $value === "0.00") return "#888"; // 보합: 회색
        return "#d60000"; // 상승: 업비트 빨강
    }};
`;

export function PercentText({ value }: { value: string }) {
    const isMinus = value.startsWith("-");
    const isZero = value === "0" || value === "0.00";

    return (
        <CoinPercentStyles $value={value}>
            {isMinus || isZero ? `${value}%` : `+${value}%`}
        </CoinPercentStyles>
    );
}
