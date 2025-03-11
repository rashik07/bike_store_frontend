/* eslint-disable @typescript-eslint/no-explicit-any */
// import NotificationToast from "@/components/ui/NotificationToast";
import {
  useGetAllUsersQuery,
//   useUpdateUserMutation,
} from "@/redux/features/admin/userManagement.api";
import { TQueryParam, TUserData } from "@/types";
import {
  Button,
  Dropdown,
  Empty,
  Spin,
  Table,
  TableColumnsType,
  Tag,
  Typography,
  Card,
} from "antd";
import { useState } from "react";
import { UserOutlined, EditOutlined } from "@ant-design/icons";

const statusItems = [
  {
    label: "Active",
    key: "active",
  },
  {
    label: "Blocked",
    key: "blocked",
  },
];

export default function UserManagement() {
//   const [userId, setUserId] = useState("");
  const [params, setParams] = useState<TQueryParam[]>([]);
  const { data: usersData, isFetching } = useGetAllUsersQuery([...params]);
//   const [updateUser] = useUpdateUserMutation();
console.log(usersData)
  const tableData = usersData?.data?.map((user: TUserData) => ({
    key: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.status,
  }));

//   const handleStatusUpdate = async (value: any) => {
   
//     const updatedData = {
//       id: userId,
//       data: {
//         status: value.key,
//       },
//     };
//     try {
//       const res = (await updateUser(updatedData)) as TResponse<any>;
//       if (res.data) {
//         NotificationToast({
//           message: "User status updated successfully",
//           type: "success",
//           toastId: "2",
//           destroyId: "loading",
//         });
//       } else if (res.error) {
//         NotificationToast({
//           message: res.error.data.message,
//           type: "error",
//           toastId: "2",
//           destroyId: "loading",
//         });
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };

  const menuProps = {
    items: statusItems,
    // onClick: handleStatusUpdate,
  };

  const columns: TableColumnsType<TUserData> = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text) => (
        <div className="flex items-center gap-2">
          <UserOutlined className="text-gray-400" />
          <span className="font-medium text-gray-700">{text}</span>
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      render: (text) => <span className="text-gray-600">{text}</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => {
        const color = status === "active" ? "green" : "red";
        return (
          <Tag color={color} className="px-3 py-1 uppercase">
            {status}
          </Tag>
        );
      },
    },
    {
      title: "Role",
      dataIndex: "role",
      render: (role) => (
        <Tag color="blue" className="px-3 py-1 uppercase">
          {role}
        </Tag>
      ),
    },
    // {
    //   title: "Actions",
    //   render: (record) => (
    //     <Dropdown menu={menuProps} trigger={["click"]}>
    //       <Button
    //         type="primary"
    //         icon={<EditOutlined />}
    //         // onClick={() => setUserId(record.key)}
    //         className="hover:opacity-90"
    //       >
    //         Update
    //       </Button>
    //     </Dropdown>
    //   ),
    // },
  ];

  if (isFetching) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (!usersData?.data?.length) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Empty
          image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
          styles={{ image: { height: 200 } }}
          description={
            <Typography.Text type="secondary" className="text-lg">
              No Users Found
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
            User Management
          </h1>
          <p className="text-center text-gray-500 mt-2">
            Manage and Monitor user accounts
          </p>
        </div>

        <Table<TUserData>
          columns={columns}
          dataSource={tableData}
          style={{ overflow: "auto" }}
          pagination={{
            current: usersData?.meta?.page,
            total: usersData?.meta?.total,
            pageSize: usersData?.meta?.limit,
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
    </div>
  );
}