import React, { useEffect, useState } from "react";
import { ICONS } from "../Icons/icons";
import { useNavigate } from "react-router-dom";
import SuperAdminLoader from "../Components/SuperAdminLoader";
import axios from "axios";

const DataAnalytics = () => {
  const savedAuth = JSON.parse(localStorage.getItem("auth"));
  const [classrooms, setClassrooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClassrooms = async () => {
      const res = await axios.get(
        //temporary pass ID
        `http://localhost:3000/admin/67a0ba10564a8b041cef28de/classrooms`
      );
      setClassrooms(res.data.classrooms);
      setLoading(false);
    };
    fetchClassrooms();
  }, [savedAuth.id]);

  const handleClassroomClick = (classroomId) => {
    navigate(`/authority/classrooms/${classroomId}/analytics`);
  };

  if (loading) {
    return <SuperAdminLoader text={"Loading Classrooms..."} />;
  }

  return (
    <main className="">
      <div className="bg-white ">
        <div className="flex items-center justify-between pb-3 mb-6 border-b border-btn">
          <div className="flex items-center gap-2 text-text">
            <span>
              <ICONS.DATA_ANALYTICS size={30} />
            </span>
            <h1 className="text-2xl font-semibold ">Class Analytics</h1>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {classrooms.map((classroom) => (
          <div
            key={classroom._id}
            className="p-4 bg-white border rounded-lg shadow cursor-pointer"
            onClick={() => handleClassroomClick(classroom._id)}
          >
            <h2 className="text-lg font-semibold ">Class : {classroom.name}</h2>
          </div>
        ))}
      </div>
    </main>
  );
};

export default DataAnalytics;
