// import { logout } from "@/redux/features/auth/authSlice";
// import { useAppDispatch } from "@/redux/hooks";
// import { Outlet } from "react-router-dom";
// import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
// import SidebarDashboard from "./SidebarDashboard";
// import { Button } from "../ui/button";
// // import { Icons } from "@/components/icons"

// const DashboardLayout = () => {
//     const dispatch = useAppDispatch();

//     const handleLogout = () => {
//       dispatch(logout());
//     };

//   return (
//     <>
//       <header className="flex items-center justify-between p-4 bg-gray-900 text-white shadow-md z-11  ">

//           <Button className="ml-auto bg-gray-500 " onClick={handleLogout}>Logout</Button>{' '}
       
//       </header>
//       <div className="flex h-screen z-1">
//         <SidebarProvider>
            
//           <SidebarDashboard />
//           <div className="flex flex-col flex-1">
//           <SidebarTrigger />
//             <main className="flex-1 p-6">
           
//               <Outlet />
//             </main>
//           </div>
//         </SidebarProvider>
//       </div>

//     </>
//   );
// };

// export default DashboardLayout;
import { logout } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { Outlet } from "react-router-dom";
import { SidebarProvider } from "../ui/sidebar";
import SidebarDashboard from "./SidebarDashboard";
import { Button } from "../ui/button";

const DashboardLayout = () => {
  const dispatch = useAppDispatch();

  // Handle logout action
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-10 p-4 bg-gray-900 text-white shadow-md">
        <Button
          className="ml-auto bg-gray-500"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </header>
      
      <div className="flex h-screen">
        <SidebarProvider>
          <SidebarDashboard />
          <div className="flex flex-col flex-1">
            <main className="flex-1 p-40">
              <Outlet />
            </main>
          </div>
        </SidebarProvider>
      </div>
    </>
  );
};

export default DashboardLayout;