import React from "react";
import { Card, Typography } from "antd";


interface BillSummaryProps {
    totalItems: number;
    totalPrice: number;
}

const { Title } = Typography;

const BillSummary: React.FC<BillSummaryProps> = ({
  totalItems,
  totalPrice,
}) => {
  return (
    <Card className="flex justify-between items-center p-4 mt-4">
      <Title level={4}>Bill Summary</Title>
      <p className="text-lg font-semibold">
        <strong>Total Items:</strong> {totalItems}
        <br />
        <strong>Total Price:</strong> ${totalPrice.toFixed(2)}
      </p>
    </Card>
  );
};

export default BillSummary;
