/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetAllProductsQuery } from "@/redux/features/admin/productManagement.api";
import { TProduct } from "@/types";
import { Tag } from "antd";
import { Link } from "react-router-dom";

const ProductSection = () => {
  const { data: productData, error, isLoading } = useGetAllProductsQuery([]);
  // console.log(productData);
  return (
    <div>
      <section className="max-w-6xl mx-auto my-8 ">
        <h2 className="text-2xl font-bold text-center mb-4">Our Products</h2>
        {isLoading && <p className="text-center">Loading...</p>}
        {error && (
          <p className="text-center text-red-500">Error loading products</p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {productData?.data?.result?.slice(0, 6).map((product: TProduct) => (
            <div
              key={product._id}
              className="border p-4 rounded-lg shadow-lg bg-white flex flex-col items-center hover:shadow-xl transition-shadow duration-300"
            >
              <Link
                to={`/ProductDetailsPage/${product._id}`}
                className="w-full"
              >
                <img
                  src={product.productImg}
                  alt={product.name}
                  className="h-40 w-full object-cover rounded"
                />
                <h3 className="text-lg font-semibold mt-2 text-center text-gray-800">
                  {product?.name?.length ?? 0 > 20
                    ? `${product?.name?.slice(0, 20)}...`
                    : product.name ?? "Unnamed Product"}
                </h3>
                <div className="flex justify-center gap-2 mt-2">
                  {product.brand && (
                    <Tag color="blue" className="text-sm">
                      Brand: {product.brand}
                    </Tag>
                  )}
                  {product.type && (
                    <Tag color="green" className="text-sm">
                      Type: {product.type}
                    </Tag>
                  )}
                </div>
                {product.price !== undefined && (
                  <p className="text-gray-600 text-center font-medium mt-2">
                    ${product.price.toFixed(2)}
                  </p>
                )}
                {/* {product.description && (
                  <p className="text-sm text-gray-500 text-center mt-1">
                    {product.description}
                  </p>
                )} */}
              </Link>
              <Link
                to={`/ProductDetailsPage/${product._id}`}
                className="mt-2 bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-700 text-center w-full font-semibold transition-colors duration-300"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductSection;
