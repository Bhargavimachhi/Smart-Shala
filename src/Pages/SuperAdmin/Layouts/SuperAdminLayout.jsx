import React from "react";
import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import AdminSidebar from "../Components/AdminSidebar";

const SuperAdminLayout = () => {
  return (
    <SidebarProvider>
      <div className="flex">
        <AdminSidebar />
        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default SuperAdminLayout;
