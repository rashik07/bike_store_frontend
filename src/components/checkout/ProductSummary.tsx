import React from "react";
import { Card, Image } from "antd";

interface Product {
  name: string;

  price: number;
  productImg: string;
}

interface ProductSummaryProps {
  product: Product;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  quantity: any;
}

const ProductSummary: React.FC<ProductSummaryProps> = ({
  product,
  quantity,
}) => {
  return (
    <Card className="flex justify-between p-4">
      <div>
        <Image
          src={product.productImg}
          alt={product.name}
          width={100}
          className="mr-4"
        />
      </div>

      <div>
        <p>
          <strong>Product:</strong> {product.name}
        </p>

        <p>
          <strong>Price:</strong> ${product.price}
        </p>
        <p>
          <strong>Quantity:</strong> {quantity}
        </p>
      </div>
    </Card>
  );
};

export default ProductSummary;
