import { GlobalTitle, Main } from "../../styles/Styles.tsx";
import { useEffect, useState } from "react";
import styled from "styled-components";
import {PercentText} from "./CoinComponent/CoinPersentStyles.tsx";

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
    height: 100%;
    padding: 100px 0;
    flex-direction: column;
    justify-content: center;
`;

const CoinContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin: auto;
    width: 70%;
    height: 100%;
    gap: 10px;
`;

const CoinChart = styled.div`
    overflow: auto;
    overflow-x: hidden;
    flex-shrink: 0;
    width: 30%;
    height: 100%;
    color: ${({ theme }) => theme.color.text};
    background-color: color-mix(in srgb, ${({ theme }) => theme.color.text} 5%, transparent);
    padding: 5px;
    border-radius: 12px;

    /* 스크롤바 숨기기 (기능은 유지) */
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE, 구형 Edge */
    &::-webkit-scrollbar {
        display: none; /* Chrome, Safari, 최신 Edge */
    }
`;

const CoinDetails = styled.div`
    flex: 1;
    background-color: color-mix(in srgb, ${({ theme }) => theme.color.text} 5%, transparent);
    border-radius: 12px;
    display: flex;
`;

const CoinDetailDsc = styled.div`
    display: flex;
    flex-direction: column;
    margin: auto;
    justify-content: space-between;
    gap: 20px;
`;

const CoinUl = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 10px 0;
    width: 100%;
`;

const CoinLi = styled.li`
    display: flex;
    background-color: ${({ theme }) => theme.color.background};
    border-radius: 10px;
    align-items: center;
    justify-content: space-between;
    padding: 5px 40px;
    cursor: pointer;

    &:hover {
        background-color: color-mix(
            in srgb,
            ${({ theme }) => theme.color.text} 25%,
            transparent
        );
    }
`;

const CoinTag = styled.div`
    display: flex;
    flex-direction: column;
`;

const CoinPrice = styled.div`
    display: flex;
    gap: 10px;
`;

const CoinName = styled.div`
    font-size: 15px;
    font-weight: 700;
`;

const CoinSymbol = styled.div`
    font-size: 11px;
    font-weight: 600;
`;

function CoinPage() {
    const [coins, setCoins] = useState<Coins[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCoin, setSelectedCoin] = useState<Coins | null>(null);

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
            return <div> 데이터를 로드중 입니다... </div>
    }

    return (
        <>
            <CoinWrapper>
                <GlobalTitle>Coin</GlobalTitle>
                <CoinContainer>
                    <CoinChart>
                        <CoinUl>
                            {coins.map(coin => (
                                <CoinLi key={coin.id} onClick={() => setSelectedCoin(coin)}>
                                    <CoinTag>
                                        <CoinName>{coin.name}</CoinName>
                                        <CoinSymbol>{coin.symbol}</CoinSymbol>
                                    </CoinTag>
                                    <CoinPrice>
                                        <div>{coin.price_usd} $</div>
                                        <PercentText value={coin.percent_change_24h} />
                                    </CoinPrice>
                                </CoinLi>
                            ))}
                        </CoinUl>
                    </CoinChart>
                    <CoinDetails>
                        {selectedCoin ? (
                            <CoinDetailDsc>
                                <h2>
                                    {selectedCoin.name} ({selectedCoin.symbol})
                                </h2>
                                <p>현재가: ${selectedCoin.price_usd}</p>
                                <p>
                                    1시간 변동:
                                    <PercentText value={selectedCoin.percent_change_1h} />
                                </p>
                                <p>
                                    24시간 변동:
                                    <PercentText value={selectedCoin.percent_change_24h} />
                                </p>
                                <p>
                                    7일 변동: <PercentText value={selectedCoin.percent_change_7d} />
                                </p>
                                <p>시가총액: ${selectedCoin.market_cap_usd}</p>
                            </CoinDetailDsc>
                        ) : (
                            <CoinDetailDsc>좌측에서 코인을 선택해 주세요.</CoinDetailDsc>
                        )}
                    </CoinDetails>
                </CoinContainer>
            </CoinWrapper>
        </>
    );
}

export default CoinPage;