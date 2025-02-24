/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Form, Input, Button, Card, Typography, Row, Col, message } from "antd";
import ProductSummary from "../checkout/ProductSummary";
import BillSummary from "../checkout/BillSummary";
import { TProduct } from "@/types";

import { useAppSelector } from "@/redux/hooks";
import { useCreateOrderMutation } from "@/redux/features/order/orderManagement.api";

interface OrderFormProps {
  products: TProduct[];
}

interface OrderFormValues {
  email: string;
  address: string;
}

const { Title } = Typography;

const OrderForm: React.FC<OrderFormProps> = ({ products }) => {
  const [createOrder] = useCreateOrderMutation();
  const user = useAppSelector((state) => state.auth.user);
  // console.log("user", user.userEmail);


  const totalItems = products.reduce((total:number, item:any) => total + item.count, 0);
  const totalPrice = products.reduce(
    (total:number, item:any) => total + item.price * item.count,
    0
  );

  const handleSubmit = async (values: OrderFormValues) => {
    try {
      await createOrder({
        email: values.email,
        address: values.address,
        products,
        totalItems,
        totalPrice,
      }).unwrap().then(() => {
        message.success("Order submitted successfully");
      });
      console.log("Order submitted", {
        values,
        products,
        totalItems,
        totalPrice,
      });
    } catch (error) {
      console.error("Order submission failed", error);
    }
  };

  return (
    <Card className="p-5 shadow-lg rounded-lg">
      <Form onFinish={handleSubmit} layout="vertical">
        <Row gutter={[24, 24]}>
          {/* User Details Section */}
          <Col xs={24} md={18}>
            <Title level={4}>Order Details</Title>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Please enter a valid email",
                },
              ]}
            >
              <Input defaultValue={user?.userEmail} disabled/>
            </Form.Item>

            <Form.Item
              label="Address"
              name="address"
              rules={[{ required: true, message: "Please enter your address" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Order Now
              </Button>
            </Form.Item>
          </Col>

          {/* Product Summary Section */}
          <Col xs={24} md={6}>
            <Title level={4}>Product Summary</Title>
            {products.map((product) => (
              <ProductSummary
                key={product._id}
                product={product}
                quantity={product.count}
              />
            ))}
            <BillSummary totalItems={totalItems} totalPrice={totalPrice} />
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default OrderForm;
