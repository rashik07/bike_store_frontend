// import AdminDashboard from "@/pages/dashboard/AdminDashboard";
// import OrderTable from "@/pages/dashboard/Orders/OrderTable";
// import Add_Products from "@/pages/dashboard/Products/Add_Products";
// import Product_table from "@/pages/dashboard/Products/Product_table";

import ProtectedRoute from "@/components/layout/ProtectedRoute";
import AboutPage from "@/pages/About/AboutPage";
import AllProducts from "@/pages/AllProduct/AllProduct";
import Cart from "@/pages/cart/cart";
import Checkout from "@/pages/checkout/Checkout";
import Home from "@/pages/home/Home";
import ProductDetailsPage from "@/pages/ProductDetailsPage/ProductDetailsPage";

export const ecommercePath = [
  {
    name: "home",
    path: "/",
    element: <Home />,
  },
  {
    name: "ProductDetailsPage",
    path: "/ProductDetailsPage/:id",
    element: <ProductDetailsPage />,
  },
  {
    name: "aboutUs",
    path: "/aboutUs",
    element: <AboutPage />,
  },
  {
    name: "AllProducts",
    path: "/allProducts",
    element: <AllProducts />,
  },
  {
    name: "cart",
    path: "/cart",
    element: (
      <ProtectedRoute role="customer">
        <Cart />
      </ProtectedRoute>
    ),
  },
  {
    name: "checkout",
    path: "/checkout",
    element: (
      <ProtectedRoute role="customer">
        <Checkout />
      </ProtectedRoute>
    ),
  },
];
