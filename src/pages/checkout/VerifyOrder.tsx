import { Link, useSearchParams } from "react-router";
import { Card, Skeleton, Badge, Button, Descriptions, Typography } from "antd";

import { useVerifyOrderQuery } from "@/redux/features/order/orderManagement.api";

const { Title } = Typography;

export default function OrderVerification() {
  const [searchParams] = useSearchParams();
  const { isLoading, data } = useVerifyOrderQuery(searchParams.get("order_id"), {
    refetchOnMountOrArgChange: true,
  });

  const orderData = data?.data?.[0];
 console.log(orderData);
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <Title level={2} className="text-center mb-6">Order Verification</Title>
      {isLoading ? (
        <Skeleton active />
      ) : (
        <div className="grid gap-6">
          <Card title="Order Details" bordered>
            <Descriptions column={1}>
              <Descriptions.Item label="Order ID">{orderData?.order_id}</Descriptions.Item>
              <Descriptions.Item label="Amount">
                {orderData?.currency} {orderData?.amount?.toFixed(2)}
              </Descriptions.Item>
              <Descriptions.Item label="Status">
                <Badge status={orderData?.bank_status === "Success" ? "success" : "error"} text={orderData?.bank_status} />
              </Descriptions.Item>
              <Descriptions.Item label="Date">
                {new Date(orderData?.date_time)?.toLocaleString()}
              </Descriptions.Item>
            </Descriptions>
          </Card>

          <Card title="Payment Information" bordered>
            <Descriptions column={1}>
              <Descriptions.Item label="Method">{orderData?.method}</Descriptions.Item>
              <Descriptions.Item label="Transaction ID">{orderData?.bank_trx_id}</Descriptions.Item>
              <Descriptions.Item label="Invoice No">{orderData?.invoice_no}</Descriptions.Item>
              <Descriptions.Item label="SP Code">{orderData?.sp_code}</Descriptions.Item>
              <Descriptions.Item label="SP Message">{orderData?.sp_message}</Descriptions.Item>
            </Descriptions>
          </Card>

          <Card title="Customer Information" bordered>
            <Descriptions column={1}>
              <Descriptions.Item label="Name">{orderData?.name}</Descriptions.Item>
              <Descriptions.Item label="Email">{orderData?.email}</Descriptions.Item>
              <Descriptions.Item label="Phone">{orderData?.phone_no}</Descriptions.Item>
              <Descriptions.Item label="Address">{orderData?.address}</Descriptions.Item>
              <Descriptions.Item label="City">{orderData?.city}</Descriptions.Item>
            </Descriptions>
          </Card>

          <Card  bordered>
          <Link to="/CustomerDashboard?key=2">
              <Button type="primary" block className="mt-4">View Orders</Button>
            </Link>
          </Card>
        </div>
      )}
    </div>
  );
}