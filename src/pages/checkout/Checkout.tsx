import { useSelector } from 'react-redux';
import { Layout, Typography } from 'antd';
import OrderForm from '@/components/form/OrderForm';

const { Header, Content } = Layout;
const { Title } = Typography;

const CheckoutPage: React.FC = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const products = useSelector((state: any) => state.cart.cartItems);

    return (
        <Layout className="min-h-screen">
            <Header className="bg-[#001529]">
                <Title className="text-white" level={2}>Checkout</Title>
            </Header>
            <Content className="p-5 bg-gray-100">
                <OrderForm products={products} />
            </Content>
        </Layout>
    );
};

export default CheckoutPage;