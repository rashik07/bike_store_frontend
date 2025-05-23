import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Image, Rate, Spin } from "antd";
import "antd/dist/reset.css";
import { useGetProductByIdQuery } from "@/redux/features/admin/productManagement.api";
// import { useAppDispatch } from "@/redux/hooks";
// import { addToCart } from "@/redux/features/cart/cartSlice";

import { ShoppingCartOutlined } from "@ant-design/icons";

const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: product, error, isLoading } = useGetProductByIdQuery(id);
  // const dispatch = useAppDispatch();

  // Quantity state
  // const [count, setCount] = useState(1);

  // const handleAddToCart = () => {
  //   if (product) {
  //     dispatch(addToCart({ ...product, count }));

  //     notification.success({
  //       message: 'Added to Cart',
  //       description: `${product.name} has been added to your cart.`,
  //       placement: 'topRight',
  //     });
  //   }
  // };

  // Increment quantity

  if (isLoading) return <Spin className="text-center" size="large" />;
  if (error || !product)
    return <p className="text-center">Error loading product details</p>;
  const { _id, quantity = 0 } = product;
  console.log(quantity);
  return (
    <div className="bg-gray-50 min-h-screen py-10">
      {/* Product Details */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 p-4">
        {/* Product Images */}
        <div className="flex justify-center items-center">
          <Image
            src={product.productImg}
            alt={product.name}
            className="w-full h-96 object-cover rounded-lg shadow-md"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">{product.name}</h1>
            <p className="text-xl text-gray-700 mt-2">${product.price}</p>
            <p className="text-gray-600 mt-2 text-left">
              {product.description}
            </p>
            <p className="text-gray-700 mt-2">
              Stock: <span className="font-semibold">{product.quantity}</span>
            </p>
            <Rate allowHalf defaultValue={4.5} className="mt-4" />

            {/* Quantity Selector */}
            {/* <div className="flex items-center mt-4">
              <Button onClick={decrementQuantity} disabled={count <= 1}>
                -
              </Button>
              <span className="mx-2 text-lg">{count}</span>
              <Button
                onClick={incrementQuantity}
                disabled={count >= product.quantity}
              >
                +
              </Button>
            </div> */}
          </div>

          <div className="flex space-x-4 mt-6">
            {/* <Button type="primary" className="flex-1" onClick={handleAddToCart}>Add to Cart</Button> */}
            {/* <Button type="default" className="flex-1">Buy Now</Button> */}
            <Button
              type="primary"
              size="large"
              icon={<ShoppingCartOutlined />}
              style={{ marginTop: "24px" }}
              onClick={() => navigate(`/checkout/${_id}`)}
              disabled={quantity === 0}
            >
              {quantity > 0 ? "Buy Now" : "Out of Stock"}
            </Button>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <section className="max-w-6xl mx-auto px-4 my-10">
        <h2 className="text-2xl font-bold text-gray-800">Customer Reviews</h2>
        <p className="text-gray-600">No reviews yet.</p>
      </section>

      {/* Specifications */}
      <section className="max-w-6xl mx-auto px-4 my-10">
        <h2 className="text-2xl font-bold text-gray-800">Details</h2>
        <p className="text-gray-600 mt-2 text-left">{product.description}</p>
      </section>

      {/* Similar Products */}
      <section className="max-w-6xl mx-auto px-4 my-10">
        <h2 className="text-2xl font-bold text-gray-800">Similar Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
          {/* Similar products mapping */}
          <div className="border p-4 rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow">
            <img
              src="/product1.jpg"
              alt="Similar Product"
              className="h-32 w-full object-cover rounded-md"
            />
            <h3 className="text-lg font-semibold mt-2">Product Name</h3>
            <p className="text-gray-600">$99.99</p>
            <Button type="primary" className="mt-2">
              View Details
            </Button>
          </div>
          {/* Add more similar products here */}
        </div>
      </section>
    </div>
  );
};

export default ProductDetailsPage;
