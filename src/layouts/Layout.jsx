import React from "react";
import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import SideNavbar from "@/components/SideNavbar";

const Layout = () => {
  return (
    <SidebarProvider>
      <div className="flex w-full">
        <SideNavbar />
        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
