import React, { useState } from "react";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { Menu, Button, Drawer } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout } from "@/redux/features/auth/authSlice";
import { clearCart } from "@/redux/features/cart/cartSlice";

const items = [
  {
    label: <Link to="/">Home</Link>,
    key: "home",
    icon: <MailOutlined />,
  },
  {
    label: <Link to="/services">Services</Link>,
    key: "services",
    icon: <AppstoreOutlined />,
  },
  {
    label: <Link to="/products">Products</Link>,
    key: "products",
    icon: <SettingOutlined />,
  },
  {
    label: <Link to="/contact">Contact</Link>,
    key: "contact",
  },
];

const MenubarEco = () => {
  const [current, setCurrent] = useState("home");
  const [visible, setVisible] = useState(false);
  const user = useAppSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleCart = () => {
    navigate("/cart");
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onClick = (e:any) => {
    setCurrent(e.key);
    setVisible(false); // Close drawer when menu item is clicked
  };

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <div className="bg-blue-600">
      <header className="py-4 px-4 flex justify-between items-center mx-auto max-w-6xl">
        <div className="px-4">
          <img
            src="/bicycleStore_transparent.png"
            alt="Logo"
            className="h-12"
          />
        </div>
        <nav className="flex items-center space-x-6">
          <Button className="lg:hidden" onClick={showDrawer} icon={<MenuOutlined />} />
          <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            theme="dark"
            className="bg-blue-600 text-white border-none hidden lg:flex"
            style={{ width: "500px" }}
            items={items}
          />
        </nav>
        <div>
          <Button
            type="default"
            shape="circle"
            icon={<ShoppingCartOutlined />}
            className="ml-6"
            onClick={handleCart}
          />
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
        </div>
      </header>
      <Drawer
        title="Menu"
        placement="right"
        onClose={onClose}
        visible={visible}
        bodyStyle={{ padding: 0 }}
      >
        <Menu
          onClick={onClick}
          selectedKeys={[current]}
          mode="inline"
          theme="dark"
          className="bg-blue-600 text-white border-none"
          items={items}
        />
      </Drawer>
    </div>
  );
};

export default MenubarEco;
