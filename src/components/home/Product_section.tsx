import { useGetAllProductsQuery } from "@/redux/features/admin/productManagement.api";

import { TProduct } from "@/types";

import { Link } from "react-router-dom";

const Product_section = () => {
  const { data, error, isLoading } = useGetAllProductsQuery([]);


  console.log(data);
  return (
    <div>
      {/* Product Section */}
      <section className="max-w-6xl mx-auto my-8 px-4">
        <h2 className="text-2xl font-bold text-center mb-4">Our Products</h2>
        {isLoading && <p>Loading...</p>}
        {error && <p>Error loading products</p>}
        <div className="grid grid-cols-4 gap-4">
          {data?.data?.result.map((product: TProduct) => (
            <div
              key={product._id}
              className="border p-4 rounded-lg shadow-lg bg-white"
            >
              <Link to={`/ProductDetailsPage/${product._id}`}>
                <img
                  src={product.productImg}
                  alt={product.name}
                  className="h-32 w-full object-cover"
                />
                <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
                <p className="text-gray-600">${product.price.toFixed(2)}</p>
                <p className="text-sm text-gray-500">{product.description}</p>
              </Link>
              <button className="mt-2 bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-700">
                Buy Now
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Product_section;
