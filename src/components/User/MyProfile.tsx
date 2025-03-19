import { useAppSelector } from "@/redux/hooks";
import { TUserData } from "@/types";
import { Avatar, Badge, Card, Spin, Statistic, Tooltip } from "antd";
import { UserOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useGetUserQuery } from "@/redux/features/admin/userManagement.api";
import ChangePassword from "@/components/User/ChangePassword";

const MyProfile = () => {
  const user = useAppSelector(selectCurrentUser);
  const { data: getUserData, isFetching } = useGetUserQuery(user?.email, {
    refetchOnMountOrArgChange: true,
    skip: !user,
  });

  if (isFetching) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
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
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      {/* Profile Header */}
      <div className="bg-white shadow-lg rounded-lg p-6 flex items-center gap-6 border border-gray-200">
        <Avatar size={100} icon={<UserOutlined />} className="bg-gray-200 text-blue-500" />
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">{name}</h1>
          <p className="text-gray-500">{email}</p>
        </div>
      </div>

      {/* User Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card bordered className="shadow-md border-gray-200">
          <Statistic
            title={<Tooltip title="User Role">Role <InfoCircleOutlined /></Tooltip>}
            value={role.toUpperCase()}
            prefix={<Badge status="success" />}
          />
        </Card>
        <Card bordered className="shadow-md border-gray-200">
          <Statistic
            title={<Tooltip title="Account Status">Status <InfoCircleOutlined /></Tooltip>}
            value={status.toUpperCase()}
            prefix={<Badge status={status === "active" ? "success" : "error"} />}
          />
        </Card>
        <Card bordered className="shadow-md border-gray-200">
          <Statistic
            title={<Tooltip title="Unique User ID">User ID <InfoCircleOutlined /></Tooltip>}
            value={_id}
            valueStyle={{ fontSize: "14px" }}
          />
        </Card>
      </div>

      {/* Additional Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Account Details" bordered className="shadow-md border-gray-200">
          <p><strong>Join Date:</strong> {joinDate}</p>
          <p><strong>Last Login:</strong> {new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}</p>
          <p><strong>Email:</strong> {email}</p>
          <p><strong>Role:</strong> {role}</p>
          <p><strong>Status:</strong> {status}</p>
        </Card>
        <ChangePassword User={getUserData} />
      </div>
    </div>
  );
};

export default MyProfile;