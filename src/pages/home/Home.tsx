import Product_section from "@/components/home/Product_section";
import Testimonial from "@/components/home/Testimonial";
import { Carousel } from "antd";

const Home = () => {
  return (
    <div>
      {/* Carousel */}
      <div className="mx-auto max-w-6xl my-6 px-4">
        <Carousel autoplay>
          <div>
            <img
              src="/banner1.jpg"
              alt="Slide 1"
              className="w-full h-64 object-cover"
            />
          </div>
          <div>
            <img
              src="/banner2.jpg"
              alt="Slide 2"
              className="w-full h-64 object-cover"
            />
          </div>
        </Carousel>
        <Product_section />
        {/* View More Products */}
        <div className="text-center my-6">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            onClick={() => (window.location.href = "/allProducts")}
          >
            View More Products
          </button>
        </div>
        {/* Promotional Banner */}
        <div className="bg-yellow-400 text-center py-4 text-xl font-bold my-6">
          Special Discount for Limited Time!
        </div>
        <Testimonial />
      </div>
    </div>
  );
};

export default Home;
