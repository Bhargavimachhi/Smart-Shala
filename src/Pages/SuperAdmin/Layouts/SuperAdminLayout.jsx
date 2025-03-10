import React from "react";
import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import AdminSidebar from "../Components/AdminSidebar";

const SuperAdminLayout = () => {
  return (
    <SidebarProvider>
      <div className="flex w-full">
        <AdminSidebar />
        <div className="flex-1 p-4">
          <Outlet />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default SuperAdminLayout;
