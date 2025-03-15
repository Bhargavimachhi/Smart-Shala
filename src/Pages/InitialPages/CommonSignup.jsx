import React from "react";
import { NavLink } from "react-router-dom";
import { User, Shield, GraduationCap, UserCog } from "lucide-react";

const CommonSignUp = () => {
  // Define roles with descriptions
  const roles = [
    {
      label: "Authority",
      path: "/signup/authority",
      icon: <Shield className="w-8 h-8" />,
      description:
        "Manage and oversee all operations. Approve requests and ensure smooth institutional management.",
    },
    {
      label: "Admin",
      path: "/signup/admin",
      icon: <UserCog className="w-8 h-8" />,
      description:
        "Handle user accounts, monitor system activities, and maintain the platform's integrity.",
    },
    {
      label: "Teacher",
      path: "/signup/teacher",
      icon: <GraduationCap className="w-8 h-8" />,
      description:
        "Upload study materials, manage classes, and track student progress and attendance.",
    },
    {
      label: "Student",
      path: "/signup/student",
      icon: <User className="w-8 h-8" />,
      description:
        "Access courses, submit assignments, and view grades and announcements from teachers.",
    },
  ];

  return (
    <div className="flex items-center justify-center min-h-screen p-5 bg-gradient-to-r from-sky-100 to-blue-100">
      <div className="w-full max-w-5xl p-10 bg-white shadow-2xl rounded-2xl">
        {/* Title */}
        <h1 className="mb-8 text-4xl font-extrabold text-center text-sky-600 drop-shadow-md">
          Signup As
        </h1>

        {/* Role Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {roles.map((role) => (
            <NavLink key={role.label} to={role.path}>
              <div className="flex flex-col justify-between h-full p-6 space-y-4 text-white transition-transform transform shadow-lg cursor-pointer bg-sky-700 rounded-xl hover:bg-sky-600 hover:scale-105">
                <div className="flex flex-col items-center space-y-3">
                  {role.icon}
                  <h2 className="text-xl font-semibold">{role.label}</h2>
                </div>
                <p className="text-sm text-center text-blue-100">
                  {role.description}
                </p>
              </div>
            </NavLink>
          ))}
        </div>

        {/* Info Text */}
        <p className="mt-10 text-base text-center text-gray-600">
          Select your role to navigate to the singup page. After verifying your
          role, you'll be redirected automatically to your dashboard.
        </p>
      </div>
    </div>
  );
};

export default CommonSignUp;
