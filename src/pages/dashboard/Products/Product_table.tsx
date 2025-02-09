import React, { useState } from "react";
import { useGetAllProductsQuery } from "@/redux/features/admin/productManagement.api";
import { Table } from "@/components/ui/table";
import { TQueryParam } from "@/types";

// Define the product type based on your API response
interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  type: string;
  description: string;
  quantity: number;
  inStock: boolean;
}

// Define the expected API response structure
interface ProductApiResponse {
  result: Product[];
}

const ProductTable: React.FC = () => {
  const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);
  const {
    data: products,
    isLoading,
    isFetching,
    isError,
  } = useGetAllProductsQuery<ProductApiResponse>(params);

  if (isLoading || isFetching) {
    return <div>Loading...</div>;
  }


  if (isError || !products?.data?.result) {
    return <div>Error loading products.</div>;
  }

  return (
    <div className="overflow-x-auto">
      <Table className="min-w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Brand</th>
            <th className="px-4 py-2 text-left">Price</th>
            <th className="px-4 py-2 text-left">Type</th>
            <th className="px-4 py-2 text-left">Description</th>
            <th className="px-4 py-2 text-left">Quantity</th>
            <th className="px-4 py-2 text-left">In Stock</th>
          </tr>
        </thead>
        <tbody>
          {products.data.result.map((product) => (
            <tr key={product.id} className="border-t hover:bg-gray-50">
              <td className="px-4 py-2">{product.name}</td>
              <td className="px-4 py-2">{product.brand}</td>
              <td className="px-4 py-2">${product.price.toFixed(2)}</td>
              <td className="px-4 py-2">{product.type}</td>
              <td className="px-4 py-2">{product.description}</td>
              <td className="px-4 py-2">{product.quantity}</td>
              <td className="px-4 py-2">
                {product.inStock ? (
                  <span className="text-green-500">In Stock</span>
                ) : (
                  <span className="text-red-500">Out of Stock</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ProductTable;
