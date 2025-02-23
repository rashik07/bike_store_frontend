import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, Col, Row, Typography, Space } from 'antd';
import { DeleteOutlined, ShoppingCartOutlined, PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { removeItem, increaseItem, decreaseItem } from '@/redux/features/cart/cartSlice';
import { RootState } from '@/redux/store';

const { Title, Text } = Typography;

const Cart: React.FC = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state: RootState) => state.cart.cartItems);

    const totalItems = cartItems.reduce((total, item) => total + item.count, 0);
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.count, 0);

    const handleRemove = (id: string) => {
        dispatch(removeItem(id));
    };

    const handleIncrease = (id: string) => {
        dispatch(increaseItem(id));
    };

    const handleDecrease = (id: string) => {
        dispatch(decreaseItem(id));
    };

    return (
        <div style={{ padding: '40px', maxWidth: '900px', margin: 'auto' }}>
            <Title level={2} style={{ textAlign: 'center' }}>
                <ShoppingCartOutlined /> Your Shopping Cart
            </Title>
            {cartItems.length === 0 ? (
                <Card style={{ textAlign: 'center', padding: '20px' }}>
                    <Title level={4}>Your cart is empty</Title>
                    <Text>Add some products to see them here.</Text>
                </Card>
            ) : (
                <>
                    <Row gutter={[16, 16]}>
                        {cartItems.map((item) => (
                            <Col key={item._id} span={24}>
                                <Card hoverable style={{ borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                                    <Row align="middle">
                                        <Col span={6} style={{ textAlign: 'center' }}>
                                            <img 
                                                src={item.productImg} 
                                                alt={item.name} 
                                                style={{ maxWidth: '80%', borderRadius: '8px' }}
                                            />
                                        </Col>
                                        <Col span={12}>
                                            <Title level={4}>{item.name}</Title>
                                            <Text strong>Price:</Text> ${item.price}
                                            <br />
                                            {/* <Text strong>Quantity:</Text> {item.count} */}
                                            <Space>
                                                <Button icon={<MinusOutlined />} onClick={() => handleDecrease(item._id)} disabled={item.count <= 1} />
                                                <Text>{item.count}</Text>
                                                <Button icon={<PlusOutlined />} onClick={() => handleIncrease(item._id)} />
                                            </Space>
                                        </Col>
                                        <Col span={6} style={{ textAlign: 'right' }}>
                                            <Button type="primary" danger icon={<DeleteOutlined />} onClick={() => handleRemove(item._id)}>
                                                Remove
                                            </Button>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                    <Card style={{ marginTop: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                        <Title level={3}>Order Summary</Title>
                        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                            <Text>Total Items: {totalItems}</Text>
                            <Text strong>Total Price: ${totalPrice.toFixed(2)}</Text>
                            <Button type="primary" size="large" style={{ width: '100%', borderRadius: '6px' }}>
                                Proceed to Checkout
                            </Button>
                        </Space>
                    </Card>
                </>
            )}
        </div>
    );
};

export default Cart;
