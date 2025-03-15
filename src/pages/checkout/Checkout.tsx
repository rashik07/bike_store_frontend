
import { Layout, Spin, Typography } from 'antd';
import OrderForm from '@/components/form/OrderForm';
import { useParams } from 'react-router-dom';
import { TProduct } from '@/types';
import { useGetProductByIdQuery } from '@/redux/features/admin/productManagement.api';

const { Header, Content } = Layout;
const { Title } = Typography;

const CheckoutPage: React.FC = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // const products = useSelector((state: any) => state.cart.cartItems);
    const { id } = useParams();
    const { data, isFetching } = useGetProductByIdQuery(id);
    if (isFetching) {
        return (
          <div className="flex justify-center items-center h-screen">
            <Spin size="large" />
          </div>
        );
      }
    
      const product = data as TProduct;
      console.log(data);
    return (
        <Layout className="min-h-screen">
            <Header className="bg-[#001529]">
                <Title className="text-white" level={2}>Checkout</Title>
            </Header>
            <Content className="p-5 bg-gray-100">
                <OrderForm products={product} />
            </Content>
        </Layout>
    );
};

export default CheckoutPage;

