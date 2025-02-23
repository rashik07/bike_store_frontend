import React from 'react';
import { Card, Typography, Image } from 'antd';

interface Product {
    name: string;
    brand: string;
    price: number;
    productImg: string;
}

interface ProductSummaryProps {
    product: Product;
    quantity: number;
}

const { Title } = Typography;

const ProductSummary: React.FC<ProductSummaryProps> = ({ product, quantity }) => {
    return (
        <Card className="flex p-4">
            <Image 
                src={product.productImg} 
                alt={product.name} 
                width={100} 
                className="mr-4"
            />
            <div className="flex-1">
                <Title level={4}>Product Summary</Title>
                <p><strong>Product:</strong> {product.name}</p>
                <p><strong>Brand:</strong> {product.brand}</p>
                <p><strong>Price:</strong> ${product.price}</p>
                <p><strong>Quantity:</strong> {quantity}</p>
            </div>
        </Card>
    );
};

export default ProductSummary;
