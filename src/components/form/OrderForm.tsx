/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Card,
  Typography,
  Row,
  Col,
  message,
  InputNumber,
} from "antd";
import ProductSummary from "../checkout/ProductSummary";
import BillSummary from "../checkout/BillSummary";
// import { TProduct } from "@/types";

import { useAppSelector } from "@/redux/hooks";
import { useCreateOrderMutation } from "@/redux/features/order/orderManagement.api";
import { TProduct } from "@/types";

interface OrderFormValues {
  email: string;
  address: string;
}

const { Title } = Typography;

const OrderForm: React.FC<TProduct> = ({ products }) => {
  const [quantity, setQuantity] = useState(1);
  const [createOrder] = useCreateOrderMutation();
  const user = useAppSelector((state) => state.auth.user);
  if (!user) {
    return <div>Please log in to place an order.</div>;
  }

  // const totalItems = quantity;
  const totalPrice = products.price * quantity;

  const handleSubmit = async (values: OrderFormValues) => {
    try {
      console.log(values);
      const res = await createOrder({
        user: values.email,
        address: values.address,
        product: products._id,
        quantity,
        totalPrice,
      }).unwrap();
      console.log(res);
      if (res.data) {
        message.success("Order submitted successfully");
        setTimeout(() => {
          // window.open(res.data.data.payment.checkout_url, "_blank");
          window.location.href = res.data.payment.checkout_url;
        }, 1000);
      } else if (res.error) {
        message.error(res.error.data.message);
      }
    } catch (error) {
      console.error("Order submission failed", error);
    }
  };

  return (
    <Card className="p-5 shadow-lg rounded-lg">
      <Form
        onFinish={handleSubmit}
        layout="vertical"
        initialValues={{
          price: products?.price,
          email: user?.email,
          quantity: 1,
        }}
      >
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
              <Input readOnly />
            </Form.Item>

            <Form.Item
              label={`Quantity Available: ${products.quantity}`}
              name="quantity"
              rules={[{ required: true, message: "Please enter your address" }]}
            >
              <InputNumber
                style={{ width: "100%" }}
                min={1}
                max={products?.quantity}
                onChange={(value) => {
                  setQuantity(value || 1);
                }}
              />
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

            <ProductSummary product={products} />

            <BillSummary totalItems={quantity} totalPrice={totalPrice} />
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default OrderForm;
