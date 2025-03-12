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
import { useAuth } from "@/context/auth";
import { ICONS } from "../Icons/icons";
import { useUserContext } from "@/context/userContext";

const TeacherSidebar = () => {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(!isMobile);
  const location = useLocation();
  const { userData } = useUserContext();

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

  const teacherNavLinks = [
    {
      name: "Home",
      icon: <ICONS.HOME size={20} />,
      path: "/teacher",
    },
    {
      name: "My Classrooms",
      icon: <ICONS.CLASSROOMS size={20} />,
      path: "/teacher/classrooms",
    },
    {
      name: "Check Homework",
      icon: <ICONS.CHECK_HOMEWORK size={20} />,
      path: "/teacher/classroomsforHomework",
    },
    {
      name: "Mark Your Attendance",
      icon: <ICONS.PRESENT size={20} />,
      path: "/teacher/mark-attendance",
    },
    {
      name: "Mark Student Attendance",
      icon: <ICONS.MARK_STU_ATTENDANCE size={20} />,
      path: "/teacher/mark-student-attendance",
    },
    {
      name: "Check Attendance",
      icon: <ICONS.CHECK_ATTENDANCE size={20} />,
      path: "/teacher/classrooms-low-attendance",
    },
    {
      name: "Generate Quiz",
      icon: <ICONS.QUIZ size={20} />,
      path: "/teacher/generate-quiz",
    },
    {
      name: "Generate Issue",
      icon: <ICONS.GENERATE_ISSUES size={20} />,
      path: "/teacher/generate-issue",
    },
    {
      name: "Request Resource",
      icon: <ICONS.BOX size={20} />,
      path: "/teacher/request-resource",
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
              {teacherNavLinks.map((link, index) => {
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
          <hr className="border-b border-btn"/>
          <nav className="flex flex-col flex-1 gap-0 p-2 space-y-2">
            {teacherNavLinks.map((link, index) => {
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

export default TeacherSidebar;
