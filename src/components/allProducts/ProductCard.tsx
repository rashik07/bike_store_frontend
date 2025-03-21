/* eslint-disable @typescript-eslint/no-explicit-any */

import { TProduct } from "@/types";
import { Link } from "react-router-dom";


type ProductCardProps = {
  product: TProduct;
  management?: boolean;
};

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div
      key={product._id}
      className="border p-4 rounded-lg shadow-lg bg-white flex flex-col items-center"
    >
      <Link to={`/ProductDetailsPage/${product._id}`} className="w-full">
        <img
          src={product.productImg}
          alt={product.name}
          className="h-40 w-full object-cover rounded"
        />
        <h3 className="text-lg font-semibold mt-2 text-center">
          {product.name}
        </h3>
        <p className="text-gray-600 text-center">${(product.price ?? 0).toFixed(2)}</p>
        <p className="text-sm text-gray-500 text-center">
          {product.description}
        </p>
      </Link>
      <Link
        to={`/ProductDetailsPage/${product._id}`}
        className="mt-2 bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-700 text-center w-full"
      >
        View Details
      </Link>
    </div>
  );
};

export default ProductCard;
