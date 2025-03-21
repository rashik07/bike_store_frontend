/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetAllProductsQuery } from "@/redux/features/admin/productManagement.api";
import { TProduct } from "@/types";
import { Link } from "react-router-dom";

const ProductSection = () => {
  const { data: productData, error, isLoading } = useGetAllProductsQuery([]);

  return (
    <div>
      <section className="max-w-6xl mx-auto my-8 ">
        <h2 className="text-2xl font-bold text-center mb-4">Our Products</h2>
        {isLoading && <p className="text-center">Loading...</p>}
        {error && <p className="text-center text-red-500">Error loading products</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {productData?.data?.result?.slice(0, 6).map((product: TProduct) => (
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
                <h3 className="text-lg font-semibold mt-2 text-center">{product.name}</h3>
                {product.price !== undefined && (
                  <p className="text-gray-600 text-center">${product.price.toFixed(2)}</p>
                )}
                {product.description && (
                  <p className="text-sm text-gray-500 text-center">{product.description}</p>
                )}
              </Link>
              <Link
                to={`/ProductDetailsPage/${product._id}`}
                className="mt-2 bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-700 text-center w-full"
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
