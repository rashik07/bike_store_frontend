import React, { useState } from "react";
import { Form, Input, Select, Button, Card, Typography, Divider } from "antd";
import ProductSummary from "../checkout/ProductSummary";
import BillSummary from "../checkout/BillSummary";

interface Product {
  _id: string;
  name: string;
  brand: string;
  price: number;
  type: string;
  description: string;
  quantity: number;
  productImg: string;
  inStock: boolean;
}

interface OrderFormProps {
  products: Product[];
}

const { Title } = Typography;
const { Option } = Select;

const OrderForm: React.FC<OrderFormProps> = ({ products }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product>(products[0]);
  const [quantity, setQuantity] = useState<number>(1);
  const [userDetails, setUserDetails] = useState({ name: "", email: "" });

  const handleQuantityChange = (value: number) => {
    setQuantity(value);
  };

  const handleProductChange = (value: string) => {
    const product = products.find((p) => p._id === value);
    if (product) {
      setSelectedProduct(product);
    }
  };

  const handleUserDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle order submission logic here
    console.log("Order submitted", { selectedProduct, quantity, userDetails });
  };

  return (
    <Card className="p-5">
      <Form
        onFinish={handleSubmit}
        layout="vertical"
        className="flex justify-between items-center"
      >
        <div>
          
         
          <Title level={4}>Order Details</Title>
            <Form.Item label="Name">
              <Input
                name="name"
                value={userDetails.name}
                onChange={handleUserDetailsChange}
                required
              />
            </Form.Item>
      
            <Form.Item label="Email">
              <Input
                type="email"
                name="email"
                value={userDetails.email}
                onChange={handleUserDetailsChange}
                required
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Order Now
              </Button>
            </Form.Item>
         
        </div>
        {/* <Divider /> */}
        <ProductSummary product={selectedProduct} quantity={quantity} />
        <BillSummary product={selectedProduct} quantity={quantity} />
      </Form>
    </Card>
  );
};

export default OrderForm;
