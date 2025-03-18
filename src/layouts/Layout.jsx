import React from "react";
import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import LeftSideNavbar from "@/Pages/Student/Components/LeftSideNavBar";

const Layout = () => {
  return (
    <SidebarProvider>
      <div className="flex w-full">
        <LeftSideNavbar />
        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
