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

const CoinUl = styled.ul`
    display: flex;
    flex-direction: column;
    max-width: 200px;
    gap: 10px;
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
                } else {
                    console.log("알 수 없는 에러가 발생했습니다. : " + err);
                }
            })
            }, [coins])

    if (loading) {
            return <div> Loading... </div>
    }

    return (
        <>
            <Main>
                <CoinUl>
                    {coins.map(coin => (
                        <CoinLi key={coin.id}>
                            <CoinName>
                                <div>{coin.name}</div>
                                <div>{coin.symbol}</div>
                            </CoinName>
                            <CoinPrice>

                            </CoinPrice>
                        </CoinLi>
                    ))}
                </CoinUl>
            </Main>
        </>
    );
}

export default CoinPage;