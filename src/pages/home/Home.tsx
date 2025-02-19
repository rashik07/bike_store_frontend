import Product_section from "@/components/home/Product_section";
import { Carousel } from "antd";
import React from "react";

const Home = () => {
  return (
    <div>
      {/* Carousel */}
      <div className="mx-auto max-w-6xl my-6 px-4">
        <Carousel autoplay>
          <div>
            <img
              src="/carousel1.jpg"
              alt="Slide 1"
              className="w-full h-64 object-cover"
            />
          </div>
          <div>
            <img
              src="/carousel2.jpg"
              alt="Slide 2"
              className="w-full h-64 object-cover"
            />
          </div>
        </Carousel>
        <Product_section />

        {/* Promotional Banner */}
        <div className="bg-yellow-400 text-center py-4 text-xl font-bold my-6">
          Special Discount for Limited Time!
        </div>
      </div>
    </div>
  );
};

export default Home;
