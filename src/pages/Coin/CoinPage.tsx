import { Main } from "../../styles/Styles.tsx";
import { useEffect, useState } from "react";
import styled from "styled-components";

export type Coins = {
    id: string;
    symbol: string;
    name: string;
    nameid: string;
    rank: number;
    price_usd: string;
    percent_change_24h: string;
    percent_change_1h: string;
    percent_change_7d: string;
    price_btc: string;
    market_cap_usd: string;
    volume24: number;
    volume24a: number;
    csupply: string;
    tsupply: string;
    msupply: string;
};

const CoinWrapper = styled.div`
    ${Main};
    display: flex;
    width: 100%;
    height: calc(100vh - 80px);
    padding: 100px 0;
`;

const CoinContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin: auto;
    width: 70%;
    height: 100%;
    gap: 10px;
    background-color: tomato;
`;

const CoinChart = styled.div`
    overflow: auto;
    overflow-x: hidden;
    flex-shrink: 0;
    width: 30%;
    height: 100%;
    
    /* 스크롤바 숨기기 (기능은 유지) */
    scrollbar-width: none;       /* Firefox */
    -ms-overflow-style: none;    /* IE, 구형 Edge */
    &::-webkit-scrollbar {
        display: none;           /* Chrome, Safari, 최신 Edge */
    }
`;

const CoinDetails = styled.div`
    display: flex;
    flex:1;
`;

const CoinUl = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 10px 0;
    width: 100%;
`;

const CoinLi = styled.li`
    display: flex;
    background-color: goldenrod;
    border-radius: 10px;
    align-items: center;
    justify-content: center;
`;

const CoinName = styled.div`
    display: flex;
    flex-direction: column;
`;

const CoinPrice = styled.div`
    display: flex;
`;

function CoinPage() {
    const [coins, setCoins] = useState<Coins[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://api.coinlore.net/api/tickers/?start=0&limit=50")
            .then(res => res.json())
            .then(({ data }: { data: Coins[] }) => {
                setCoins(data)
                setLoading(false);
            })
            .catch((err: unknown ) => {
                if (err instanceof Error) {
                    console.log(err.message);
                    setLoading(false);
                } else {
                    console.log("알 수 없는 에러가 발생했습니다. : " + err);
                    setLoading(false);
                }
            })
            }, [])

    if (loading) {
            return <div> Loading... </div>
    }

    return (
        <>
            <CoinWrapper>
                <CoinContainer>
                    <CoinChart>
                        <CoinUl>
                            {coins.map(coin => (
                                <CoinLi key={coin.id}>
                                    <CoinName>
                                        <div>{coin.name}</div>
                                        <div>{coin.symbol}</div>
                                    </CoinName>
                                    <CoinPrice></CoinPrice>
                                </CoinLi>
                            ))}
                        </CoinUl>
                    </CoinChart>
                    <CoinDetails></CoinDetails>
                </CoinContainer>
            </CoinWrapper>
        </>
    );
}

export default CoinPage;