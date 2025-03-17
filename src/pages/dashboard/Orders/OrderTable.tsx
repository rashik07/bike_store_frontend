/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    useGetAllOrdersQuery,
    useUpdateOrderStatusMutation,
  } from "@/redux/features/order/orderManagement.api";
  import { TOrder } from "@/types/order.type";
  import {
    Empty,
    Spin,
    Table,
    TableColumnsType,
    Typography,
    Card,
    Tag,
    Dropdown,
    Button,
    message,
  } from "antd";
  import { DollarCircleOutlined, ShoppingOutlined } from "@ant-design/icons";
  import { useState } from "react";
  import { EditOutlined } from "@ant-design/icons";
//   import NotificationToast from "@/components/ui/NotificationToast";
  import {  TQueryParam, TResponse } from "@/types";
//   import { Column, Pie } from "@ant-design/charts";
  
  const statusItems = [
    {
      label: "Pending",
      key: "pending",
    },
    {
      label: "Paid",
      key: "paid",
    },
    {
      label: "Shipped",
      key: "shipped",
    },
    {
      label: "Delivered",
      key: "delivered",
    },
    {
      label: "Cancelled",
      key: "cancelled",
    },
  ];
  
//   type ChartDataItem = {
//     name: string;
//     value: number;
//   };
  
  export default function OrderManagement() {
    const [orderId, setOrderId] = useState("");
    const [params, setParams] = useState<TQueryParam[]>([]);
    const { data: ordersData, isFetching } = useGetAllOrdersQuery([
      ...params,
    ]);
    console.log(ordersData)
    const [updateStatus] = useUpdateOrderStatusMutation();
    const tableData = ordersData?.data?.map((order: TOrder) => ({
      key: order._id,
      _id: order._id,
      orderId: order.orderId,
      customer: order.user,
      lPrice: order.totalPrice,
      quantity: order.quantity,
      product: order.product.name,
      status: order.status,
      transaction_id: order?.transaction?.paymentId,
    }));
  
    const handleStatusChange = async (value: any) => {
     
      message.loading("Updating Order status...");
      const updatedData = {
        id: orderId,
        data: {
          status: value.key,
        },
      };
      try {
        const res = (await updateStatus(updatedData)) as TResponse<any>;
        if (res.data) {
        
          message.success("Order status updated successfully");
        } else if (res.error) {
        
          message.error("Failed to update order status");
        }
      } catch (err) {
        console.log(err);
      }
    };
  
    // const calculateMetrics = () => {
    //   if (!ordersData?.data)
    //     return { totalRevenue: 0, totalUnits: 0, productSales: [] };
  
    //   const totalRevenue = ordersData.data.reduce(
    //     (acc: number, order: TOrder) => acc + order.totalPrice,
    //     0
    //   );
    //   const totalUnits = ordersData.data.reduce(
    //     (acc: number, order: TOrder) => acc + order.quantity,
    //     0
    //   );
  
    //   const salesByProduct = ordersData.data.reduce(
    //     (acc: { [key: string]: number }, order: TOrder) => {
    //       const productName = order.product.name;
    //       acc[productName] = (acc[productName] || 0) + order.quantity;
    //       return acc;
    //     },
    //     {}
    //   );
  
    //   const productSales: ChartDataItem[] = Object.entries(salesByProduct).map(
    //     ([name, value]) => ({
    //       name,
    //       value: value as number,
    //     })
    //   );
  
    //   return { totalRevenue, totalUnits, productSales };
    // };
  
    const menuProps = {
      items: statusItems,
      onClick: handleStatusChange,
    };
  
    const columns: TableColumnsType<TOrder> = [
      {
        title: "Order ID",
        dataIndex: "orderId",
        key: "orderId",
        render: (text) => (
          <Tag color="blue">
            <code>{text}</code>
          </Tag>
        ),
      },
      {
        title: "Product",
        dataIndex: "product",
        key: "product",
        render: (text) => (
          <span className="font-medium text-gray-700">{text}</span>
        ),
      },
      {
        title: "Customer",
        dataIndex: "customer",
        key: "customer",
        render: (text) => (
          <span className="font-medium text-gray-700">{text}</span>
        ),
      },
      {
        title: "Quantity",
        dataIndex: "quantity",
        key: "quantity",
        render: (quantity) => (
          <Tag color="green">
            <ShoppingOutlined /> {quantity}
          </Tag>
        ),
      },
      {
        title: "Total Price",
        dataIndex: "lPrice",
        key: "lPrice",
        render: (price) => (
          <Tag color="gold">
            <DollarCircleOutlined /> ${price}
          </Tag>
        ),
      },
      {
        title: "Transaction ID",
        dataIndex: "transaction_id",
        key: "transaction_id",
        render: (text) => (
          <Tag color="purple">
            <code>{text}</code>
          </Tag>
        ),
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (status) => {
          const statusColors = {
            pending: "orange",
            paid: "blue",
            shipped: "cyan",
            delivered: "green",
            cancelled: "red",
          };
          return (
            <Tag color={statusColors[status as keyof typeof statusColors]}>
              {status.toUpperCase()}
            </Tag>
          );
        },
      },
      {
        title: "Actions",
        render: (record) => (
          <Dropdown menu={menuProps} trigger={["click"]}>
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => setOrderId(record.key)}
              className="hover:opacity-90"
            >
              Update
            </Button>
          </Dropdown>
        ),
      },
    ];
  
    if (isFetching) {
      return (
        <div className="flex justify-center items-center h-screen">
          <Spin size="large" />
        </div>
      );
    }
  
    if (ordersData?.data.length === 0) {
      return (
        <div className="flex justify-center items-center h-screen">
          <Empty
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            styles={{ image: { height: 200 } }}
            description={
              <Typography.Text type="secondary" className="text-lg">
                No Orders Found
              </Typography.Text>
            }
          />
        </div>
      );
    }
  
    return (
      <div className="p-6">
        <Card className="shadow-md">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 text-center">
              Order Management
            </h1>
            <p className="text-center text-gray-500 mt-2">
              Manage and track all customer orders
            </p>
          </div>
  
          <Table<TOrder>
            columns={columns}
            dataSource={tableData}
            style={{ overflow: "auto" }}
            pagination={{
              current: ordersData?.meta?.page,
              total: ordersData?.meta?.total,
              pageSize: ordersData?.meta?.limit,
              onChange: (newPage, pageSize) => {
                const existingParams = params.filter(
                  (param) => param.name !== "page" && param.name !== "limit"
                );
                setParams([
                  ...existingParams,
                  { name: "page", value: newPage.toString() },
                  { name: "limit", value: pageSize.toString() },
                ]);
              },
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} products`,
              showSizeChanger: true,
            }}
            className="shadow-sm"
            bordered
          />
        </Card>
        {/* <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card title="Sales Overview" className="shadow-md">
            <div className="text-center mb-4">
              <Typography.Title level={4}>Total Revenue</Typography.Title>
              <Typography.Title level={2}>
                ${calculateMetrics().totalRevenue}
              </Typography.Title>
              <Typography.Title level={4}>Units Sold</Typography.Title>
              <Typography.Title level={2}>
                {calculateMetrics().totalUnits}
              </Typography.Title>
            </div>
          </Card>
  
          <Card title="Top Selling Products" className="shadow-md">
            <Pie
              data={calculateMetrics().productSales}
              angleField="value"
              colorField="name"
              radius={0.8}
              label={{
                formatter: (record: { name: any; value: any; }) =>
                  record ? `${record.name || ""}: ${record.value || 0}` : "",
                autoRotate: true,
                style: { fontSize: 12 },
              }}
            />
          </Card> */}
  
          {/* <Card
            title="Monthly Sales Trend"
            className="shadow-md col-span-1 md:col-span-2"
          >
            <Column
              data={ordersData?.data?.map((order: TOrder) => ({
                month: new Date(order.createdAt).toLocaleString("default", {
                  month: "long",
                }),
                sales: order.totalPrice,
              }))}
              xField="month"
              yField="sales"
              label={{
                position: "top",
                style: {
                  fill: "#FFFFFF",
                  opacity: 0.6,
                },
              }}
            />
          </Card>
        </div> */}
      </div>
    );
  }