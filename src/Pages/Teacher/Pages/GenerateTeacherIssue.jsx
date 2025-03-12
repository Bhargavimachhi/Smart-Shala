import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import TeacherLoader from "../Components/TeacherLoader";
import { ICONS } from "../Icons/icons";

const GenerateTeacherIssue = () => {
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState("low");
  const [classroomId, setClassroomId] = useState("");
  const [classrooms, setClassrooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const savedAuth = JSON.parse(localStorage.getItem("auth"));

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:3000/teacher/classrooms/${classroomId}/generate-issue`,
        {
          description,
          severity,
        }
      );
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error generating issue:", error);
      toast.error("Failed to generate issue");
    }
  };

  useEffect(() => {
    const fetchClassrooms = async () => {
      const res = await axios.get(
        `http://localhost:3000/teacher/${savedAuth.id}/classrooms`
      );
      setClassrooms(res.data.classrooms);
      setLoading(false);
    };
    fetchClassrooms();
  }, []);

  if (loading) {
    return <TeacherLoader text={"Generate Issues..."} />;
  }

  return (
    <main>
      <div className="bg-white">
        <div className="flex items-center justify-between pb-3 mb-6 border-b border-btn">
          <div className="flex items-center gap-2 text-text">
            <span>
              <ICONS.GENERATE_ISSUES size={30} />
            </span>
            <h1 className="text-2xl font-semibold "> Generate Issue</h1>
          </div>
        </div>
        <div className="flex justify-center p-4">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-3xl p-6 space-y-6 transition-all bg-white shadow-lg rounded-xl"
          >
            <h2 className="mb-4 text-2xl font-semibold text-sky-800">
              Generate Issue
            </h2>

            {/* Description */}
            <div className="flex flex-col">
              <label className="mb-2 font-medium text-gray-700">
                Description
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 transition border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                placeholder="Enter issue description"
                required
              />
            </div>

            {/* Severity */}
            <div className="flex flex-col">
              <label className="mb-2 font-medium text-gray-700">Severity</label>
              <select
                value={severity}
                onChange={(e) => setSeverity(e.target.value)}
                className="w-full px-4 py-3 transition border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                required
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            {/* Select Classroom */}
            <div className="flex flex-col">
              <label
                htmlFor="classrooms"
                className="mb-2 font-medium text-gray-700"
              >
                Select Classroom
              </label>
              <select
                onChange={(e) => setClassroomId(e.target.value)}
                className="w-full px-4 py-3 transition border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                required
              >
                <option value={"Select Option"}>Select Option</option>
                {classrooms.map((classroom) => (
                  <option
                    key={classroom._id}
                    value={classroom._id}
                    name={classroom.name}
                  >
                    {classroom.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 font-medium text-white transition rounded-lg shadow bg-sky-600 hover:bg-sky-700"
              >
                Generate Issue
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default GenerateTeacherIssue;
