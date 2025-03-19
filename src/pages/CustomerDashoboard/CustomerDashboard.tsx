import MyOrders from "@/components/User/MyOrder";
import MyProfile from "@/components/User/MyProfile";
import { Tabs } from "antd";

export default function CustomerDashboard() {
  const onChange = (key: string) => {
    console.log(key);
  };
  const items = [
    {
      key: "1",
      label: "My Profile",
      children: <MyProfile />,
    },
    {
      key: "2",
      label: "Orders",
      children: <MyOrders />,
    },
  ];
  return (
    <>
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="bg-white shadow-xl rounded-lg overflow-hidden">
            <Tabs defaultActiveKey="1" items={items} onChange={onChange} centered />
          </div>
        </div>
      </div>
    </>
  );
}
