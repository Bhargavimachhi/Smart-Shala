import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SideNavbar from "../../../components/SideNavbar";
import axios from "axios";
import Loader from "../../InitialPages/Loader";

const Dataanalyticspage = () => {
  const savedAuth = JSON.parse(localStorage.getItem("auth"));
  const [classrooms, setClassrooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchClassrooms() {
      const res = await axios.get(
        `http://localhost:3000/admin/${savedAuth.id}/classrooms`
      );
      setClassrooms(res.data.classrooms);
      setLoading(false);
    }
    fetchClassrooms();
  }, [savedAuth.id]);

  const handleClassroomClick = (classroomId) => {
    navigate(`/admin/classrooms/${classroomId}/analytics`);
  };

  if (loading) {
    return <Loader text={"Loading..."} />;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex-1 w-full p-8 m-5 bg-white rounded">
        <div className="flex-1 p-8">
          <div className="mb-6">
            <h1 className="mb-2 text-2xl font-bold">Class Analytics</h1>
            <p className="text-gray-600">
              Comprehensive overview of student performance metrics
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {classrooms.map((classroom) => (
              <div
                key={classroom._id}
                className="p-6 bg-white rounded-lg shadow hover-card cursor-pointer"
                onClick={() => handleClassroomClick(classroom._id)}
              >
                <h2 className="mb-4 text-lg font-semibold">
                  Class: {classroom.name}
                </h2>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dataanalyticspage;
