import MyOrders from "@/components/User/MyOrder";
import MyProfile from "@/components/User/MyProfile";
import { Tabs } from "antd";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function CustomerDashboard() {
  const [searchParams] = useSearchParams();
  const key = searchParams.get("key") || "1"; // Default to "1" if key is not present
  console.log(key);
  const [activeKey, setActiveKey] = useState(key);
  const onChange = (key: string) => {
    setActiveKey(key);
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
            <Tabs activeKey={activeKey} items={items} onChange={onChange} centered />
          </div>
        </div>
      </div>
    </>
  );
}