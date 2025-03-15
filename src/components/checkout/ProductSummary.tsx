import React from "react";
import { Card, Image } from "antd";
import { TProduct } from "@/types";



const ProductSummary: React.FC<TProduct> = ({
  product

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
          {/* <strong>Quantity:</strong> {product.quantity} */}
        </p>
      </div>
    </Card>
  );
};

export default ProductSummary;
