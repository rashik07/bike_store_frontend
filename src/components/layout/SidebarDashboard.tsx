// import {
//   Sidebar,
//   SidebarContent,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarGroupLabel,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
// } from "@/components/ui/sidebar";

// import { Bike, Home , GitMerge, ListOrdered } from "lucide-react";

// const SidebarDashboard = () => {
//   const items = [
//     {
//       title: "Dashboard",
//       url: "/admin/dashboard",
//       icon: Home,
//     },
//     {
//       title: "Add Products",
//       url: "/admin/addProduct",
//       icon: Bike,
//     },
//     {
//       title: "Product List",
//       url: "/admin/ProductTable",
//       icon: GitMerge ,
//     },
//     {
//       title: "Order List",
//       url: "/admin/OrderTable",
//       icon: ListOrdered  ,
//     },
//   ];

//   return (
//     <Sidebar className="mt-[68px]">
//       <SidebarContent>
//         <SidebarGroup>
//           <SidebarGroupLabel>Application</SidebarGroupLabel>
//           <SidebarGroupContent>
//             <SidebarMenu>
//               {items?.map((item) => (
//                 <SidebarMenuItem key={item.title}>
//                   <SidebarMenuButton asChild>
//                     <a href={item.url}>
//                       <item.icon />
//                       <span>{item.title}</span>
//                     </a>
//                   </SidebarMenuButton>
//                 </SidebarMenuItem>
//               ))}
//             </SidebarMenu>
//           </SidebarGroupContent>
//         </SidebarGroup>
//       </SidebarContent>
//     </Sidebar>
//   );
// };

// export default SidebarDashboard;
import { Layout, Menu } from "antd";
import {
  HomeOutlined,
  PlusCircleOutlined,
  UnorderedListOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Sider } = Layout;

const SidebarDashboard = () => {
  const navigate = useNavigate();

  const items = [
    {
      key: "/admin/dashboard",
      icon: <HomeOutlined />,
      label: "Dashboard",
    },
    {
      key: "/admin/addProduct",
      icon: <PlusCircleOutlined />,
      label: "Add Products",
    },
    {
      key: "/admin/ProductTable",
      icon: <UnorderedListOutlined />,
      label: "Product List",
    },
    {
      key: "/admin/OrderTable",
      icon: <ShoppingCartOutlined />,
      label: "Order List",
    },
  ];

  return (
    <Sider style={{ height: "100vh" }}>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["/admin/dashboard"]}
        onClick={({ key }) => navigate(key)}
        items={items}
      />
    </Sider>
  );
};

export default SidebarDashboard;
