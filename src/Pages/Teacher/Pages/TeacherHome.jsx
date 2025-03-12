import React, { useEffect, useState } from "react";
import TeacherProfile from "../Components/ProfilePageComponents/TeacherProfile";
import axios from "axios";
import { ICONS } from "../Icons/icons";
import TeacherLoader from "../Components/TeacherLoader";

const TeacherHome = () => {
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(false);
  const savedAuth = JSON.parse(localStorage.getItem("auth"));

  // Handle navigation if user is not authenticated or not a teacher
  useEffect(() => {
    // Fetch teacher data from the server
    const fetchTeacher = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:3000/teacher/${savedAuth.id}`
        );
        setTeacher(response.data.teacher);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching teacher data:", error);
      }
    };
    fetchTeacher();
  }, []);

  if (loading) {
    return <TeacherLoader text={"Loading Teacher data..."} />;
  }

  return (
    <>
      <main>
        {/* Main Content */}
        <div className="bg-white">
          <div className="flex items-center justify-between pb-3 mb-6 border-b border-btn">
            <div className="flex items-center justify-center gap-0 text-text">
              <span>
                <ICONS.WELCOME size={30} />
              </span>
              <h1 className="text-2xl font-semibold ">
                elcome, {teacher && teacher?.name}
              </h1>
              <span className="ml-3">
                <ICONS.CHECK_ATTENDANCE size={30} />
              </span>
            </div>
          </div>

          <div>{teacher && <TeacherProfile teacher={teacher} />}</div>
        </div>
      </main>
    </>
  );
};

export default TeacherHome;
