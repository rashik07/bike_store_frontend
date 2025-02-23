import React from 'react';
import { Card, Typography } from 'antd';

interface Product {
    price: number;
}

interface BillSummaryProps {
    product: Product;
    quantity: number;
}

const { Title } = Typography;

const BillSummary: React.FC<BillSummaryProps> = ({ product, quantity }) => {
    const totalPrice = product.price * quantity;

    return (
        <Card className="flex justify-between items-center p-4 mt-4">
            <Title level={4}>Bill Summary</Title>
            <p className="text-lg font-semibold">
                <strong>Total Price:</strong> ${totalPrice.toFixed(2)}
            </p>
        </Card>
    );
};

export default BillSummary;
