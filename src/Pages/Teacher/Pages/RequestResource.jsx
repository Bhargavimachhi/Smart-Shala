import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { Button } from "@mui/material";
import { ICONS } from "../Icons/icons";

const RequestResource = () => {
  const savedAuth = JSON.parse(localStorage.getItem("auth"));
  const navigate = useNavigate();
  const { id } = useParams();
  const [resources, setResources] = useState([]);
  const [teacher, setTeacher] = useState(null);
  const [selectedResource, setSelectedResource] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [classroom, setClassroom] = useState("");

  console.log(resources);

  useEffect(() => {
    async function fetchClassroom() {
      try {
        const res = await axios.get(`http://localhost:3000/classroom/${id}`);
        setClassroom(res.data.classroom);
        fetchResources(res.data.classroom.admin);
      } catch (error) {
        toast.error("Classroom does not exist");
      }
    }

    async function fetchResources(id) {
      try {
        const res = await axios.get(`http://localhost:3000/${id}/resources`);
        setResources(res.data.resources);
      } catch (error) {
        toast.error("Error fetching resources:", error);
      }
    }

    async function fetchTeacher() {
      try {
        const res = await axios.get(
          `http://localhost:3000/teacher/${savedAuth.id}`
        );
        setTeacher(res.data.teacher);
      } catch (error) {
        toast.error("Error fetching resources:", error);
      }
    }

    fetchClassroom();
    fetchTeacher();
  }, []);

  const handleRequest = async () => {
    // console.log("request-rersource fucntion called");
    try {
      await axios.post(
        `http://localhost:3000/${classroom.admin}/request-resource`,
        {
          teacherId: teacher.name,
          name: selectedResource,
          quantity: Number(quantity),
          classroomId: classroom.name,
        }
      );
      toast.success("Resource requested successfully");
    } catch (error) {
      console.error("Error requesting resource:", error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <main>
      <div className="bg-white">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 mb-6 border-b border-btn">
          <div className="flex items-center gap-2 text-text">
            <span>
              <ICONS.BOX size={30} />
            </span>
            <h1 className="font-semibold md:text-2xl">Request Resource</h1>
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
        <div className="flex justify-center px-4 py-6">
          <div className="w-full max-w-3xl overflow-hidden bg-white shadow-lg rounded-xl">
            {/* Header */}
            <h1 className="w-full py-6 text-3xl font-bold text-center text-white bg-gradient-to-r from-sky-700 to-sky-900">
              Request Resource
            </h1>

            {/* Form Container */}
            <div className="p-6 space-y-6">
              {/* Select Resource Title */}
              <h2 className="text-2xl font-semibold text-center text-sky-800">
                Select Resource
              </h2>

              {/* Classroom Name */}
              <h5 className="text-lg font-medium text-gray-700">
                Classroom Name :{" "}
                <span className="font-semibold text-sky-600">
                  {classroom.name}
                </span>
              </h5>

              {/* Resource Dropdown */}
              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  Choose Resource
                </label>
                <select
                  value={selectedResource}
                  onChange={(e) => setSelectedResource(e.target.value)}
                  className="w-full px-4 py-3 transition border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                >
                  <option value="">Select Resource</option>
                  {resources.map((resource) => (
                    <option key={resource._id} value={resource.name}>
                      {resource.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Quantity Input */}
              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  Quantity
                </label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  min="1"
                  className="w-full px-4 py-3 transition border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              {/* Request Button */}
              <button
                onClick={handleRequest}
                className="w-full py-3 font-semibold text-white transition rounded-lg shadow-md bg-sky-700 hover:bg-sky-800"
              >
                Request Resource
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default RequestResource;
