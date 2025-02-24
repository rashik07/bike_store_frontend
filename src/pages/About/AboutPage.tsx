import { Card } from "antd";

const AboutPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <Card className="max-w-3xl w-full shadow-lg rounded-2xl p-6 bg-white">
        <h1 className="text-3xl font-bold text-center mb-4">About Us</h1>
        <h2 className="text-xl font-semibold mb-2">Our Mission</h2>
        <p className="text-gray-700 mb-4">
          At <strong>Bicycle Store</strong>, we are passionate about providing
          high-quality bicycles that cater to riders of all skill levels. Our
          mission is to make cycling accessible, enjoyable, and sustainable by
          offering a curated selection of bikes and accessories that enhance
          every ride.
        </p>
        <h2 className="text-xl font-semibold mb-2">Who We Are</h2>
        <p className="text-gray-700 mb-4">
          Founded in <strong>[2025]</strong>, we started as a small team of
          cycling enthusiasts dedicated to sharing our love for biking with the
          community. Over the years, we've grown into a trusted bicycle shop
          known for quality products, expert advice, and exceptional customer
          service.
        </p>
        <h2 className="text-xl font-semibold mb-2">What We Offer</h2>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li>A wide range of bicycles, from road bikes to mountain bikes.</li>
          <li>Accessories and gear to enhance your cycling experience.</li>
          <li>Professional bike fitting and maintenance services.</li>
          <li>Knowledgeable staff ready to assist you.</li>
        </ul>
        <h2 className="text-xl font-semibold mb-2">Why Choose Us?</h2>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li>
            <strong>Quality Assurance:</strong> We stock only the best brands.
          </li>
          <li>
            <strong>Customer Satisfaction:</strong> Our team is committed to
            your needs.
          </li>
          <li>
            <strong>Community Focused:</strong> Supporting local cycling events.
          </li>
        </ul>
        <h2 className="text-xl font-semibold mb-2">Visit Us</h2>
        <p className="text-gray-700">
          Come by our shop at <strong>Kallyanpur,Dhaka</strong> and explore our
          collection. Whether you’re a beginner or a seasoned rider, we have
          something for everyone!
        </p>
      </Card>
    </div>
  );
};

export default AboutPage;
