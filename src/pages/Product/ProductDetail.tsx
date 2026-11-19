import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import styled from "styled-components";
import type { ProductListTypes } from "./ProductList.tsx";

type ProductDetailTypes = ProductListTypes & {
    brand?: string;
    description: string;
    tags: string[];
    images: string[];
};

/* ================= Styled Components ================= */

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
`;

const Header2 = styled.div`
    width: 100%;
    height: 8dvh;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: rgba(0, 0, 0, 0.012);
    padding: 0 40px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.03);
`;

const Logo = styled(Link)`
    margin-left: 20px;
    display: flex;
    font-size: 1.3rem;
    font-weight: bold;
    letter-spacing: 12px;
    transform: scaleX(1.1);
    color: #666;
    transition: color 0.3s;
    cursor: pointer;
    border: none;
    outline: none;
    background-color: transparent;
    text-decoration: none;

    &:hover {
        color: rgba(0, 0, 0, 0.35);
    }
`;

const Sign2 = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 25px;
    margin-right: 10px;
    font-size: 0.75rem;
    font-weight: 400;
    letter-spacing: 2px;
    color: #666;
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

const ImgZone = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    width: 100%;
    height: 62dvh;
    color: white;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    overflow: hidden;
`;

const ProductImage = styled.img`
    display: flex;
    width: 15%;
`;

const Main = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 45%;
    height: 1000px;
`;

const ProductCategory = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 14px;
    padding: 100px 0 16px;
    font-size: 14px;
    font-weight: 500;
    color: #888;
`;

const ProductCopy = styled.div`
    display: flex;
`;

const ProductName = styled.div`
    display: flex;
    padding: 6px 0;
    font-size: 40px;
    font-weight: 500;
    color: #666;
    border-top: 1px solid rgba(0, 0, 0, 0.075);
`;

const Price = styled.div`
    margin: 40px 0 10px 0;
    font-size: 24px;
    font-weight: 300;
    color: rgba(0, 0, 0, 0.5);
`;

const BuyUi = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 40px;
    gap: 12px;
    align-items: center;
    text-align: center;
`;

const BuyButton = styled.button`
    margin-right: 20px;
    padding: 10px 24px;
    border: none;
    outline: none;
    border-radius: 8px;
    color: white;
    background-color: #888;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
        background-color: rgba(200, 200, 200, 0.7);
        color: #666;
    }
`;

const QuantityButton = styled.button`
    border: none;
    outline: none;
    padding: 8px;
    background: transparent;
    cursor: pointer;
    font-size: 20px;
    font-weight: 300;
`;

const Tags = styled.div`
    display: flex;
    flex-direction: row;
    gap: 24px;
    color: #888;
    margin: 100px 0;
    font-size: 12px;
    font-weight: 300;
`;

const Description = styled.div`
    color: #333;
    text-align: center;
    font-size: 14px;
    font-weight: 300;
`;

const HrLine = styled.div`
    margin: 100px 0;
    width: 100%;
    height: 1px;
    border-top: 1px solid rgba(0, 0, 0, 0.075);
`;

/* ================= Component ================= */

function ProductDetail() {
    const { id } = useParams();

    const [list, setList] = useState<ProductDetailTypes | null>(null);
    const [loading, setLoading] = useState(true);
    const [qtt, setQtt] = useState(1);

    useEffect(() => {
        fetch(`https://dummyjson.com/products/${id}`)
            .then(res => res.json())
            .then((json: ProductDetailTypes) => {
                setList(json);
                setLoading(false);
            })
            .catch((err: unknown) => {
                console.log(err);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (!list) return <div>상품 정보를 불러오지 못했습니다.</div>;

    const totalPrice = (list.price * qtt).toFixed(2);

    const tagMaker = list.tags.map((tag, index) => {
        return <div key={index}># {tag}</div>;
    });

    const handleQuantity = (delta: number) => {
        setQtt(prev => {
            if (prev + delta < 1) return prev;
            return prev + delta;
        });
    };

    return (
        <Container>
            <Header2>
                <Logo to="/product">BEAUTY</Logo>
                <Sign2>
                    <SignButton>로그인</SignButton>
                    <SignButton>회원가입</SignButton>
                    <SignButton>KOR</SignButton>
                </Sign2>
            </Header2>
            <ImgZone>
                {list.images.map((item, index) => (
                    <ProductImage key={index} src={item} alt={list.title} />
                ))}
            </ImgZone>
            <Main>
                <ProductCategory>
                    <ProductCopy>{list.category}</ProductCopy>·
                    {list.brand && <ProductCopy>{list.brand}</ProductCopy>}
                </ProductCategory>
                <ProductName>{list.title}</ProductName>
                <Price>{totalPrice} $</Price>
                <BuyUi>
                    <BuyButton type="button">Buy</BuyButton>
                    <QuantityButton type="button" onClick={() => handleQuantity(1)}>
                        +
                    </QuantityButton>
                    <div>{qtt}</div>
                    <QuantityButton type="button" onClick={() => handleQuantity(-1)}>
                        -
                    </QuantityButton>
                </BuyUi>
                <Tags>{tagMaker}</Tags>
                <Description>{list.description}</Description>
                <HrLine />
                <div />
            </Main>
        </Container>
    );
}

export default ProductDetail;
