import { useLocation, useNavigate } from "react-router-dom";
import { IoSchoolSharp } from "react-icons/io5";
import {
  TeacherIcon,
  HomeIcon,
  DataIcon,
  MeetingIcon,
  StudentIcon,
} from "../Pages/Admin/Icons/NavIcon.jsx";
import { CircleCheckBig } from "lucide-react";
import { useAuth } from "../context/auth.jsx";
import { useEffect, useState } from "react";
import axios from "axios";

const SideNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const savedAuth = JSON.parse(localStorage.getItem("auth"));
  const [admin, setAdmin] = useState(null);

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
    { icon: HomeIcon, name: "Home", path: "/admin" },
    // { icon: StudentIcon, name: "Students", path: "/admin/students" },
    // { icon: TeacherIcon, name: "Teachers", path: "/admin/teachers" },
    { icon: TeacherIcon, name: "Schools", path: "/admin/schools" },
    { icon: StudentIcon, name: "Classrooms", path: "/admin/classrooms" },
    { icon: DataIcon, name: "Data Analytics", path: "/admin/data-analytics" },
    { icon: MeetingIcon, name: "Meeting", path: "/admin/meeting" },
    { icon: MeetingIcon, name: "Issues", path: "/admin/issues" },
    { icon: DataIcon, name: "Resources", path: "/admin/resources" },
  ];

  return (
    <div className="w-64 p-4 space-y-4 bg-white border border-r-border">
      <div className="flex items-center gap-2 p-2 ">
        <div className="flex items-center justify-center w-8 h-8 bg-blue-500 rounded-full">
          <span className="text-sm text-white">{admin && admin.email[0]}</span>
        </div>
        <div>
          <p className="text-sm font-medium">Admin</p>
          <p className="text-xs text-gray-500">{admin && admin.email}</p>
        </div>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => (
          <button
            key={item.name}
            onClick={() => navigate(item.path)}
            className={`w-44 flex items-center gap-2 p-2 rounded-lg ${
              location.pathname === item.path
                ? "text-white bg-blue-500 "
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <img
              src={item.icon}
              width={25}
              className={`transition-colors duration-300 ${
                location.pathname === item.path
                  ? "filter invert"
                  : "filter grayscale"
              }`}
              alt={item.name}
            />
            {item.name}
          </button>
        ))}
      </nav>

      <button
        onClick={handleLogout}
        className="flex items-center w-full gap-2 p-2 mt-auto text-gray-600 rounded-lg hover:bg-gray-100"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </svg>
        Logout
      </button>
    </div>
  );
};

export default SideNavbar;
