import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Sidebar } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { ICONS } from "../Icons/icons";
import { useAuth } from "@/context/auth";

const AdminSidebar = () => {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(!isMobile);
  const location = useLocation();
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth({
      _id: null,
      token: "",
      role: "",
    });
    localStorage.removeItem("token");
    navigate("/login");
  };

  const toggleSidebar = () => setOpen((prev) => !prev);

  const AdminLinks = [
    {
      name: "Home",
      icon: <ICONS.HOME size={20} />,
      path: "/authority",
    },
    {
      name: "Schools",
      icon: <ICONS.SCHOOLS size={20} />,
      path: "/authority/schools",
    },
    {
      name: "Data Analytics",
      icon: <ICONS.DATA_ANALYTICS size={20} />,
      path: "/authority/data-analytics",
    },
    {
      name: "Teacher Analytics",
      icon: <ICONS.DATA_ANALYTICS size={20} />,
      path: "/authority/teacher/analytics"
    },
    {
      name: "Student Analytics",
      icon: <ICONS.DATA_ANALYTICS size={20} />,
      path: "/authority/student/analytics"
    }
  ];

  return (
    <>
      {isMobile ? (
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent
            side="left"
            className="flex flex-col w-64 p-4 bg-gray-300"
          >
            <SheetHeader>
              <SheetTitle>Smart Shala Admin</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col flex-1 gap-2 mt-4 space-y-2">
              {AdminLinks.map((link, index) => {
                return (
                  <>
                    <Link
                      key={index}
                      to={link.path}
                      label={link.name}
                      onClick={toggleSidebar}
                    >
                      <div className="flex items-center justify-start gap-2">
                        <span className="text-black">{link.icon}</span>
                        <span>{link.name}</span>
                      </div>
                    </Link>
                  </>
                );
              })}
            </nav>
            <div className="p-4 border-t border-gray-700">
              <Button variant="destructive" className="w-full">
                Logout
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      ) : (
        <Sidebar className="w-56 h-screen text-black bg-bg">
          <div className="p-5 text-xl font-bold border-b text-text border-text bg-bg">
            Smart Shala Admin
          </div>
          <nav className="flex flex-col flex-1 gap-0 p-4 space-y-2">
            {AdminLinks.map((link, index) => {
              return (
                <>
                  <Link
                    key={index}
                    to={link.path}
                    label={link.name}
                    onClick={toggleSidebar}
                  >
                    <div
                      className={`flex items-center justify-start gap-2 p-2 rounded-lg ${
                        location.pathname === link.path
                          ? "bg-btn text-white"
                          : "hover:bg-bg text-text hover:border-btn border"
                      }`}
                    >
                      <span>{link.icon}</span>
                      <span>{link.name}</span>
                    </div>
                  </Link>
                </>
              );
            })}
          </nav>
          <div className="p-4 border-t border-text">
            <Button
              variant="default"
              className="flex items-center justify-between w-full"
              onClick={handleLogout}
            >
              <span>Logout</span>
              <ICONS.LOGOUT size={20} />
            </Button>
          </div>
        </Sidebar>
      )}
      <Button
        className="absolute z-50 p-2 rounded-full top-4 left-4 sm:hidden"
        variant="ghost"
        size="icon"
        onClick={toggleSidebar}
      >
        <ICONS.PANEL_LEFT className="w-6 h-6" />
      </Button>
    </>
  );
};

export default AdminSidebar;
