import React from "react";
// import { Button } from '../ui/button';
import { logout } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button, Menu } from "antd";
import "antd/dist/reset.css";

const MainLayout = () => {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };
const handleLogin = () => {
  navigate("/login");
}
  console.log(user);
  return (
    <div>
      {/* this is main MainLayout <br/>
            <Outlet />
            <Button onClick={handleLogout}>Click me</Button> */}

      <div className="bg-gray-100 min-h-screen ">
        {/* Header */}
        <div className="bg-blue-600">
          <header className=" py-4 px-16 flex justify-between items-center mx-auto max-w-6xl ">
            <div className="px-4">
              <img
                src="/bicycleStore_transparent.png"
                alt="Logo"
                className="h-12"
              />
            </div>
            <nav className="px-4 flex items-center space-x-6">
              <Menu
                mode="horizontal"
                theme="dark"
                className="bg-blue-600 text-white border-none "
                style={{ width: "325px" }}
              >
                <Menu.Item key="home">Home</Menu.Item>
                <Menu.Item key="services">Services</Menu.Item>
                <Menu.Item key="products">Products</Menu.Item>
                <Menu.Item key="contact">Contact</Menu.Item>
              </Menu>
              {user ? (
                <Button
                  type="primary"
                  danger
                  className="ml-6"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              ) : (
                <Button
                  type="primary"
                  danger
                  className="ml-6"
                  onClick={handleLogin}
                >
                  Login
                </Button>
              )}
            </nav>
          </header>
        </div>
        <Outlet />

        <footer className="bg-gray-800 text-white py-6 mt-8">
          <div className="max-w-6xl mx-auto grid grid-cols-4 gap-4 px-4">
            <div>
              <img src="/logo.png" alt="Logo" className="h-12 mb-2" />
              <p>Quality you can trust</p>
            </div>
            <div>
              <h3 className="font-bold">Quick Links</h3>
              <ul>
                <li>About</li>
                <li>Careers</li>
                <li>Blog</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold">Newsletter</h3>
              <input
                type="email"
                placeholder="Enter email"
                className="p-2 w-full text-black border rounded"
              />
              <button className="bg-blue-500 px-4 py-1 mt-2 rounded hover:bg-blue-700">
                Subscribe
              </button>
            </div>
            <div>
              <h3 className="font-bold">Follow Us</h3>
              <div className="flex space-x-4">
                <span>FB</span>
                <span>Twitter</span>
                <span>Instagram</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default MainLayout;
