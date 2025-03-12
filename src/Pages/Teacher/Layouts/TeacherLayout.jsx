import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import { Outlet } from "react-router-dom";
import TeacherSidebar from "../Components/TeacherSidebar";

const TeacherLayout = () => {
  return (
    <>
      <SidebarProvider>
        <div className="flex w-full">
          <TeacherSidebar />
          <div className="flex-1 p-4">
            <Outlet />
          </div>
        </div>
      </SidebarProvider>
    </>
  );
};

export default TeacherLayout;
