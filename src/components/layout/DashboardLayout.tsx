
// import { logout } from "@/redux/features/auth/authSlice";
// import { useAppDispatch } from "@/redux/hooks";
// import { Outlet } from "react-router-dom";
// import { SidebarProvider } from "../ui/sidebar";
// import SidebarDashboard from "./SidebarDashboard";
// import { Button } from "../ui/button";

// const DashboardLayout = () => {
//   const dispatch = useAppDispatch();

//   // Handle logout action
//   const handleLogout = () => {
//     dispatch(logout());
//   };

//   return (
//     <>
//       <header className="fixed top-0 left-0 right-0 z-10 p-4 bg-gray-900 text-white shadow-md">
//         <Button
//           className="ml-auto bg-gray-500"
//           onClick={handleLogout}
//         >
//           Logout
//         </Button>
//       </header>
      
//       <div className="flex h-screen">
//         <SidebarProvider>
//           <SidebarDashboard />
//           <div className="flex flex-col flex-1">
//             <main className="flex-1 p-40">
//               <Outlet />
//             </main>
//           </div>
//         </SidebarProvider>
//       </div>
//     </>
//   );
// };

// export default DashboardLayout;


import { Layout, Button } from "antd";
import { logout } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { Outlet } from "react-router-dom";
import SidebarDashboard from "./SidebarDashboard";

const { Header, Content } = Layout;

const DashboardLayout = () => {
  const dispatch = useAppDispatch();

  // Handle logout action
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ background: "#001529", padding: "15px 16px", display: "flex", justifyContent: "flex-end" }}>
        <Button type="primary" danger onClick={handleLogout}>
          Logout
        </Button>
      </Header>
      <Layout>
        <SidebarDashboard />
        <Layout style={{ padding: "40px" }}>
          <Content>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
