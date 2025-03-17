import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth.jsx";
import axios from "axios";
import { ICONS } from "../Pages/Admin/Icons/icons.jsx";
import { Avatar } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { useUserContext } from "@/context/userContext.jsx";

const SideNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const savedAuth = JSON.parse(localStorage.getItem("auth"));
  const [admin, setAdmin] = useState(null);
  const { userData } = useUserContext();

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
    <div className="w-auto p-4 space-y-4 bg-white border border-r-border">
      <div className="flex items-center gap-2 p-2 ">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-btn">
          <Avatar
            sx={{ bgcolor: "primary.main", width: 35, height: 35 }}
            src={userData?.face}
          >
          </Avatar>
        </div>
        <div>
          <p className="text-sm font-medium">Admin</p>
          <p className="text-xs text-text">{admin && admin.email}</p>
        </div>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => (
          <button
            key={item.name}
            onClick={() => navigate(item.path)}
            className={`w-44 flex items-center gap-2 p-2 rounded-lg ${
              location.pathname === item.path
                ? "text-white bg-btn"
                : "text-text hover:bg-bg"
            }`}
          >
            <div
              className={`transition-colors duration-300 ${
                location.pathname === item.path ? "filter" : "filter grayscale"
              }`}
              alt={item.name}
            >
              <span>{item.icon}</span>
            </div>
            {item.name}
          </button>
        ))}
      </nav>

      <button
        onClick={handleLogout}
        className="flex items-center w-full gap-2 p-2 mt-auto rounded-lg text-text hover:bg-bg"
      >
        <span>
          <ICONS.LOGOUT size={25} />
        </span>
        Logout
      </button>
    </div>
  );
};

export default SideNavbar;
