import React from "react";

import { Outlet } from "react-router-dom";

import "antd/dist/reset.css";
import MenubarEco from "./MenubarEco";

const MainLayout = () => {
  return (
    <div>
      {/* this is main MainLayout <br/>
            <Outlet />
            <Button onClick={handleLogout}>Click me</Button> */}

      <div className="bg-gray-100 min-h-screen ">
        {/* Header */}
        <MenubarEco />
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
