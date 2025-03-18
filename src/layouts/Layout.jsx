import React from "react";
import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import LeftSideNavbar from "@/Pages/Student/Components/LeftSideNavBar";

const Layout = () => {
  return (
    <div className="w-full">
      <Outlet />
    </div>
  );
};

export default Layout;
