import React, { useState } from "react";
import "../css/HoLeftNavBar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/auth.jsx";
import { ICONS } from "../Icons/icons";
import { useUserContext } from "@/context/userContext";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Sheet,
  SheetContent,
  SheetHeader,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Sidebar } from "@/components/ui/sidebar";

const LeftSideNavbar = () => {
  const isMobile = useIsMobile();
  const [auth, setAuth] = useAuth();
  const location = useLocation();
  const { userData } = useUserContext();
  const [open, setOpen] = useState(!isMobile);
  const navigate = useNavigate();
  const handleLogout = () => {
    setAuth({
      _id: null,
      token: "",
      role: "",
    });
    localStorage.removeItem("token");
    navigate("/login")
  };

  const StudentNavLinks = [
    { name: "Home", icon: <ICONS.HOME size={20} />, path: "/student" },
    {
      name: "Submit Homework",
      icon: <ICONS.FILE size={20} />,
      path: "/student/submit-homework",
    },
    {
      name: "Performance Report",
      icon: <ICONS.DOCUMENT size={20} />,
      path: "/student/performance",
    },
    {
      name: "Quizzes",
      icon: <ICONS.QUIZ size={20} />,
      path: "/student/quizzes",
    },
    {
      name: "Attendence",
      icon: <ICONS.INFO size={20} />,
      path: "/student/attendance",
    },
    {
      name: "Notifications",
      icon: <ICONS.BELL size={20} />,
      path: "/student/notification",
    },
    {
      name: " Doubts(Chat bot)",
      icon: <ICONS.CHAT size={20} />,
      path: "/student/doubts",
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
              {StudentNavLinks.map((link, index) => {
                return (
                  <>
                    <Link
                      key={index}
                      to={link.path}
                      label={link.name}
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
              <Button variant="destructive" className="w-full" onClick={handleLogout}>
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
            {StudentNavLinks.map((link, index) => {
              return (
                <>
                  <Link
                    key={index}
                    to={link.path}
                    label={link.name}
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
    </>
  );
};

export default LeftSideNavbar;
