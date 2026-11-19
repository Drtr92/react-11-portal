import { useEffect, useState } from "react";
import { Link } from "react-router";
import styled, { css } from "styled-components";
import { BANNER_IMAGES } from "./ProductSource/ProductScreen.ts";

export type ProductListTypes = {
    id: number;
    title: string;
    category: string;
    price: number;
    thumbnail: string;
};

/* ================= Styled Components ================= */

const Container = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    background-color: white;
    flex-direction: column;
    align-items: center;
`;

const PhotoZone = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    width: 100%;
    height: 70dvh;
    color: white;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    overflow: hidden;
`;

const SliderTrack = styled.div<{ $scapeNumber: number }>`
    position: absolute;
    inset: 0;
    display: flex;
    width: 100%;
    height: 100%;
    transition: transform 0.5s ease-in-out;
    z-index: 1;
    transform: translateX(-${({ $scapeNumber }) => $scapeNumber * 100}%);
`;

const SlideItem = styled.div<{ $bgUrl: string }>`
    flex-shrink: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url("${({ $bgUrl }) => $bgUrl}");
`;

const Header = styled.div`
    z-index: 2;
    width: 100%;
    height: 8dvh;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: rgba(0, 0, 0, 12%);
    padding: 0 40px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.03);
`;

const Logo = styled.div`
    margin-left: 20px;
    display: flex;
    font-size: 1.3rem;
    font-weight: bold;
    letter-spacing: 12px;
    transform: scaleX(1.1);
    color: white;
    transition: color 0.3s;
    cursor: pointer;

    &:hover {
        color: rgba(0, 0, 0, 0.35);
    }
`;

const Sign = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 25px;
    margin-right: 10px;
    font-size: 0.75rem;
    font-weight: 400;
    letter-spacing: 2px;
    color: white;
    cursor: pointer;
`;

const SignButton = styled.div`
    transition:
        color 0.3s,
        transform 0.3s;

    &:hover {
        color: rgba(0, 0, 0, 0.35);
        transform: scale(1.1);
    }
`;

const PhotoZoneUi = styled.div`
    position: absolute;
    inset: 0;
    z-index: 2;
    pointer-events: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 30px;
`;

const PzButton = styled.button<{ $direction: "left" | "right" }>`
    position: absolute;
    top: 8dvh;
    height: calc(100% - 8dvh);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 160px;
    opacity: 0.3;
    transition: opacity 0.3s ease;
    border: none;
    z-index: 2;
    pointer-events: auto;

    &:hover {
        cursor: pointer;
        opacity: 1;
    }

    ${({ $direction }) =>
    $direction === "left"
        ? css`
                  left: 0;
                  background: linear-gradient(to right, rgba(0, 0, 0, 0.4) 0%, transparent 100%);
              `
        : css`
                  right: 0;
                  background: linear-gradient(to left, rgba(0, 0, 0, 0.4) 0%, transparent 100%);
              `}
`;

const DotGroup = styled.div`
    position: absolute;
    bottom: 25px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    gap: 12px;
    pointer-events: auto;
`;

const Dot = styled.button<{ $isActive: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${({ $isActive }) => ($isActive ? "28px" : "10px")};
    height: 10px;
    border-radius: ${({ $isActive }) => ($isActive ? "10px" : "50%")};
    border: none;
    background-color: ${({ $isActive }) => ($isActive ? "rgb(150 150 150)" : "white")};
    cursor: pointer;
    transition:
        background-color 0.3s,
        width 0.3s;

    &:hover {
        background-color: rgb(150 150 150);
    }
`;

const CardZone = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: start;
    justify-content: center;
    width: 60%;
`;

const Card = styled.div<{ $bgUrl: string }>`
    display: flex;
    flex-direction: column;
    min-width: 0;
    width: calc(100% / 4);
    height: 400px;
    align-items: center;
    justify-content: start;
    background-repeat: no-repeat;
    background-size: auto 45%;
    background-position: center;
    background-image: url("${({ $bgUrl }) => $bgUrl}");
    transition:
        transform 0.3s ease,
        box-shadow 0.3s ease;
    cursor: pointer;

    &:hover {
        transform: scale(1.0075);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    }
`;

const CardLink = styled(Link)`
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: end;
    flex-direction: column;
    min-width: 0;
    padding: 15px;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.05) 0%, transparent 35%);
    color: #666;
    text-decoration: none;
`;

const ItemCategory = styled.div`
    font-size: 0.75rem;
    font-weight: 400;
    width: 100%;
`;

const ItemTitle = styled.div`
    font-size: 0.95rem;
    font-weight: 600;
    margin: 10px 0;
    line-height: 1.3;
    width: 100%;
    height: 50px;
`;

const ItemPrice = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: end;
    font-size: 0.75rem;
    font-weight: 400;
    width: 100%;
`;

/* ================= Component ================= */

function ProductList() {
    const [list, setList] = useState<ProductListTypes[]>([]);
    const [loading, setLoading] = useState(true);
    const [scapeNumber, setScapeNumber] = useState(0);

    useEffect(() => {
        fetch("https://dummyjson.com/products?limit=12")
            .then(res => res.json())
            .then((json: { products: ProductListTypes[] }) => {
                setList(json.products);
                setLoading(false);
            })
            .catch((err: unknown) => {
                console.log(err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>데이터를 로드 중입니다...</div>;
    }

    if (list.length === 0) {
        return <div>상품을 찾을 수 없거나, 오류가 발생 되었습니다.</div>;
    }

    const renderedCards = list.map(item => (
        <Card key={item.id} $bgUrl={item.thumbnail}>
            <CardLink to={`/product/productDetail/${item.id}`}>
                <ItemCategory>{item.category}</ItemCategory>
                <ItemTitle>{item.title}</ItemTitle>
                <ItemPrice>${item.price}</ItemPrice>
            </CardLink>
        </Card>
    ));

    const handlePrev = () => {
        setScapeNumber(prev => (prev === 0 ? BANNER_IMAGES.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setScapeNumber(prev => (prev === BANNER_IMAGES.length - 1 ? 0 : prev + 1));
    };

    return (
        <Container>
            <PhotoZone>
                <SliderTrack $scapeNumber={scapeNumber}>
                    {BANNER_IMAGES.map((url, index) => (
                        <SlideItem key={index} $bgUrl={url} />
                    ))}
                </SliderTrack>
                <Header>
                    <Logo>BEAUTY</Logo>
                    <Sign>
                        <SignButton>로그인</SignButton>
                        <SignButton>회원가입</SignButton>
                        <SignButton>KOR</SignButton>
                    </Sign>
                </Header>
                <PhotoZoneUi>
                    <PzButton type="button" $direction="left" onClick={handlePrev} />
                    <DotGroup>
                        {BANNER_IMAGES.map((_, index) => (
                            <Dot
                                type="button"
                                key={index}
                                $isActive={scapeNumber === index}
                                onClick={() => setScapeNumber(index)}
                            />
                        ))}
                    </DotGroup>
                    <PzButton type="button" $direction="right" onClick={handleNext} />
                </PhotoZoneUi>
            </PhotoZone>
            <CardZone>{renderedCards}</CardZone>
        </Container>
    );
}

export default ProductList;