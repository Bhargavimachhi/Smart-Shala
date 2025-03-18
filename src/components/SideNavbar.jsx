import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth.jsx";
import axios from "axios";
import { ICONS } from "../Pages/Admin/Icons/icons.jsx";
import { useUserContext } from "@/context/userContext.jsx";
import { useIsMobile } from "@/hooks/use-mobile";
import { Link } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Sidebar } from "@/components/ui/sidebar";

const SideNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const savedAuth = JSON.parse(localStorage.getItem("auth"));
  const [admin, setAdmin] = useState(null);
  const { userData } = useUserContext();
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(!isMobile);

  useEffect(() => {
    async function getAdmin() {
      const res = await axios.get(
        `http://localhost:3000/admin/${savedAuth.id}`
      );
      setAdmin(res.data.admin);
    }
    getAdmin();
  }, []);

  const handleLogout = () => {
    setAuth({
      _id: null,
      token: "",
      role: "",
    });
    localStorage.removeItem("token");
    navigate("/login");
  };

  const toggleSidebar = () => { setOpen(!open);}

  const navItems = [
    { icon: <ICONS.HOME size={20} />, name: "Home", path: "/admin" },
    {
      icon: <ICONS.STUDENTS size={20} />,
      name: "Students",
      path: "/admin/students",
    },
    {
      icon: <ICONS.TEACHERS size={20} />,
      name: "Teachers",
      path: "/admin/teachers",
    },
    {
      icon: <ICONS.CLASSROOMS size={20} />,
      name: "Classrooms",
      path: "/admin/classrooms",
    },
    {
      icon: <ICONS.DATA_ANALYTICS size={20} />,
      name: "Data Analytics",
      path: "/admin/data-analytics",
    },
    { icon: <ICONS.ISSUES size={20} />, name: "Issues", path: "/admin/issues" },
    {
      icon: <ICONS.RESOUECE size={20} />,
      name: "Resources",
      path: "/admin/resources",
    },
  ];

  return (
    <>
      {isMobile ? (
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent
            side="left"
            className="flex flex-col w-64 h-full p-4 bg-gray-300"
          >
            <SheetHeader>
              <div className="flex items-center gap-2 p-2 ">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-btn">
                  <span className="text-sm text-white">
                    {/* {userData?.name[0]} */}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium">Hello {userData?.name}</p>
                  <p className="text-xs text-text">{userData?.email}</p>
                </div>
              </div>
            </SheetHeader>
            <nav className="flex flex-col flex-1 gap-2 mt-0 space-y-2">
              {navItems.map((link, index) => {
                return (
                  <>
                    <Link key={index} to={link.path} label={link.name}>
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
              <Button
                variant="destructive"
                className="w-full"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      ) : (
        <Sidebar className="w-64 h-screen text-black bg-bg">
          <div className="flex items-center gap-2 p-2 mb-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-btn">
              {/* <span className="text-sm text-white">{userData?.name[0]}</span> */}
            </div>
            <div>
              <p className="text-sm font-medium">Hello {userData?.name}</p>
              <p className="text-xs text-text">{userData?.email}</p>
            </div>
          </div>
          <hr className="border-b border-btn" />
          <nav className="flex flex-col flex-1 gap-0 p-2 space-y-2">
            {navItems.map((link, index) => {
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
        <ICONS.PANEL_LEFT className="w-6 h-6" size={20} />
      </Button>
    </>
  );
};

export default SideNavbar;
