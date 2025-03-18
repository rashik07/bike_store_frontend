import { useAppSelector } from "@/redux/hooks";
import { TUserData } from "@/types";
import { Avatar, Badge, Card, Spin, Statistic } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useGetUserQuery } from "@/redux/features/admin/userManagement.api";
import ChangePassword from "@/components/User/ChangePassword";
import MyOrders from "@/components/User/MyOrder";

export default function CustomerDashboard() {
  const user = useAppSelector(selectCurrentUser);
  const { data: getUserData, isFetching } = useGetUserQuery(user?.email, {
    refetchOnMountOrArgChange: true,
    skip: !user,
  });

  if (isFetching) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  const { name, email, _id, role, status, createdAt } = getUserData?.data as TUserData;
  const joinDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-8 py-10">
            <div className="flex items-center gap-8">
              <Avatar size={100} icon={<UserOutlined />} className="bg-white text-blue-500" />
              <div className="text-white">
                <h1 className="text-3xl font-bold">{name}</h1>
                <p className="text-blue-100">{email}</p>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8">
            <Card bordered={false} className="shadow-md">
              <Statistic title="Role" value={role.toLocaleUpperCase()} prefix={<Badge status="success" />} />
            </Card>
            <Card bordered={false} className="shadow-md">
              <Statistic
                title="Status"
                value={status.toLocaleUpperCase()}
                prefix={<Badge status={status === "active" ? "success" : "error"} />}
              />
            </Card>
            <Card bordered={false} className="shadow-md">
              <Statistic title="User ID" value={_id} valueStyle={{ fontSize: "14px" }} />
            </Card>
          </div>

          {/* Additional Info */}
          <div className="px-8 py-6 bg-gray-50">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card title="Account Details" bordered={false} className="shadow-md">
                <p>
                  <strong>Join Date:</strong> {joinDate}
                </p>
                <p>
                  <strong>Last Login:</strong>{" "}
                  {new Date().toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </Card>
              <ChangePassword User={getUserData} />
            
            </div>
            <MyOrders />
          </div>
        </div>
      </div>
    </div>
  );
}