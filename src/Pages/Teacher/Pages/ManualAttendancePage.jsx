import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ICONS } from "../Icons/icons";
import { Button, Card } from "@mui/material";
import TeacherLoader from "../Components/TeacherLoader";

const ManualAttendancePage = () => {
  const savedAuth = JSON.parse(localStorage.getItem("auth"));
  const [classrooms, setClassrooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClassrooms = async () => {
      if (savedAuth && savedAuth.id) {
        const res = await axios.get(
          `http://localhost:3000/teacher/${savedAuth.id}/manual-attendance`
        );
        setClassrooms(res.data.classrooms);
        setLoading(false);
      } else {
        setLoading(false);
      }
    };
    fetchClassrooms();
  }, [savedAuth]);

  const handleClassroomClick = (classroomId) => {
    navigate(`/teacher/classrooms/${classroomId}/manual-attendance`);
  };

  if (loading) {
    return <TeacherLoader text="Loading Classrooms..." />;
  }

  return (
    <main>
      <div className="bg-white">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 mb-6 border-b border-btn">
          <div className="flex items-center gap-2 text-text">
            <span>
              <ICONS.STUDENT size={30} />
            </span>
            <h1 className="font-semibold md:text-2xl">
              Manual Classrooms Attendance
            </h1>
          </div>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            onClick={() => navigate(-1)}
          >
            <span>
              <ICONS.BACK size={20} />
            </span>
            <span>Back</span>
          </Button>
        </div>
        <div className="w-full">
          <p className="mb-6 text-base text-center text-text md:text-lg">
            Select a classroom to mark attendance
          </p>

          <div className="grid grid-cols-1 gap-6 px-4 md:grid-cols-2 lg:grid-cols-3 md:px-8">
            {classrooms.map((classroom) => (
              <Card
                key={classroom._id}
                onClick={() => handleClassroomClick(classroom._id)}
                className="p-6 transition-all duration-300 transform border border-gray-200 shadow-md cursor-pointer rounded-xl bg-gradient-to-br from-white to-blue-50 hover:from-blue-50 hover:to-blue-100 hover:-translate-y-1 hover:shadow-lg"
              >
                <h2 className="mb-2 text-xl font-bold text-center text-btn">
                  Class : {classroom.name}
                </h2>

                <p className="text-sm text-center text-text">
                  Click to mark attendance
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default ManualAttendancePage;
