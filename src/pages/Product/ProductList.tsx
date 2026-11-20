import { useEffect, useState } from "react";
import { Link } from "react-router";
import styled from "styled-components";

export type ProductListTypes = {
    id: number;
    title: string;
    category: string;
    price: number;
    thumbnail: string;
};

const Container = styled.div`
    display: flex;
    width: 100%;
    background-color: white;
    flex-direction: column;
    align-items: center;
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

function ProductList() {
    const [list, setList] = useState<ProductListTypes[]>([]);
    const [loading, setLoading] = useState(true);

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

    return (
        <Container>
            <CardZone>{renderedCards}</CardZone>
        </Container>
    );
}

export default ProductList;