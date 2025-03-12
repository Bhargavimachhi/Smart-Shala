import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../../../../firebase";
import { ICONS } from "../../Icons/icons";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AddHomeworkPage = () => {
  const [classrooms, setClassrooms] = useState([]);
  const [selectedClassroom, setSelectedClassroom] = useState("");
  const [homeworkTitle, setHomeworkTitle] = useState("");
  const [homeworkDescription, setHomeworkDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [subject, setSubject] = useState("");
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    console.log("File selected:", file);
    setFile(file);
  };
  const savedAuth = JSON.parse(localStorage.getItem("auth"));

  useEffect(() => {
    // Fetch classrooms from the server
    const fetchClassrooms = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/teacher/${savedAuth.id}/classrooms`
        );
        setClassrooms(response.data.classrooms);
      } catch (error) {
        console.error("Error fetching classrooms:", error);
      }
    };
    fetchClassrooms();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        title: homeworkTitle,
        description: homeworkDescription,
        dueDate: dueDate,
        subject: subject,
        id: selectedClassroom,
      };
      const res = await axios.post(
        `http://localhost:3000/teacher/${savedAuth.id}/assign-homework`,
        formData
      );
      console.log(res.data);

      const homworkid = res.data.homework._id;
      console.log(file);

      const fileType = file?.type;

      if (fileType === "application/pdf") {
        const toastId = toast.loading("Uploading your  teacher homework...");

        try {
          const refoffile = ref(storage, `homeworks/${homworkid}/teachersfile`);
          uploadBytes(refoffile, file).then((snapshot) => {
            console.log("Uploaded teacher homework!", snapshot);
            toast.dismiss(toastId);
            toast.success("Homework uploaded successfully!");

            setFile(null);
          });
        } catch (error) {
          console.log(error);
          toast.dismiss(toastId);
          toast.error("Failed to upload homework!");

          setFile(null);
        }
      }

      toast.success("Homework assigned to classroom");
      // Reset form fields
      setHomeworkTitle("");
      setHomeworkDescription("");
      setDueDate("");
      setSubject("");
      setSelectedClassroom("");
      setFile(null);
    } catch (error) {
      console.error("Error assigning homework:", error);
      alert("Failed to assign homework");
    }
  };

  return (
    <main>
      <div className="bg-white">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 mb-6 border-b border-btn">
          <div className="flex items-center gap-2 text-text">
            <span>
              <ICONS.BOOK size={30} />
            </span>
            <h1 className="text-2xl font-semibold ">Assign Homework</h1>
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
        <div className="flex justify-center p-4 bg-gray-50">
          <div className="w-full max-w-3xl overflow-hidden bg-white shadow-lg rounded-xl">
            {/* Header */}
            {/* <h1 className="py-2 text-3xl font-extrabold text-center text-white bg-gradient-to-r from-green-600 to-green-800">
              Assign Homework
            </h1> */}

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              {/* Classroom Selection */}
              <div>
                <label
                  htmlFor="classroom"
                  className="block mb-2 text-base font-semibold text-text"
                >
                  Classroom
                </label>
                <select
                  id="classroom"
                  value={selectedClassroom}
                  onChange={(e) => setSelectedClassroom(e.target.value)}
                  className="w-full px-4 py-3 transition border rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-btn"
                  required
                >
                  <option value="">Select a classroom</option>
                  {classrooms.map((classroom) => (
                    <option key={classroom._id} value={classroom._id}>
                      {classroom.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Homework Title */}
              <div>
                <label
                  htmlFor="title"
                  className="block mb-2 text-base font-semibold text-text"
                >
                  Homework Title
                </label>
                <input
                  id="title"
                  type="text"
                  value={homeworkTitle}
                  onChange={(e) => setHomeworkTitle(e.target.value)}
                  className="w-full px-4 py-3 transition border rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-btn"
                  required
                />
              </div>

              {/* Subject */}
              <div>
                <label
                  htmlFor="subject"
                  className="block mb-2 text-base font-semibold text-text"
                >
                  Subject
                </label>
                <input
                  id="subject"
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-4 py-3 transition border rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-btn"
                  required
                />
              </div>

              {/* Homework Description */}
              <div>
                <label
                  htmlFor="description"
                  className="block mb-2 text-base font-semibold text-text"
                >
                  Homework Description
                </label>
                <textarea
                  id="description"
                  value={homeworkDescription}
                  onChange={(e) => setHomeworkDescription(e.target.value)}
                  rows="4"
                  className="w-full px-4 py-3 transition border rounded-lg resize-none text-text focus:outline-none focus:ring-2 focus:ring-btn"
                  required
                ></textarea>
              </div>

              {/* Due Date */}
              <div>
                <label
                  htmlFor="dueDate"
                  className="block mb-2 text-base font-semibold text-text"
                >
                  Due Date
                </label>
                <input
                  id="dueDate"
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full px-4 py-3 transition border rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-btn"
                  required
                />
              </div>

              {/* Upload File */}
              <div>
                <label
                  htmlFor="file"
                  className="block mb-2 text-base font-semibold text-text"
                >
                  Upload File
                </label>

                <div className="relative flex items-center justify-between w-full px-4 py-3 transition border-2 border-dashed rounded-lg cursor-pointer text-text bg-gray-50 hover:border-btn">
                  <input
                    id="file"
                    type="file"
                    onChange={handleFileSelect}
                    className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                  />

                  {/* Icon + Text */}
                  <div className="flex items-center space-x-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-btn"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12v6m0 0l-3-3m3 3l3-3M12 4v8"
                      />
                    </svg>
                    <span className="text-sm font-medium text-text">
                      Click to upload or drag file here
                    </span>
                  </div>

                  {/* File format suggestion (Optional) */}
                  <span className="text-xs text-gray-400">PDF, DOCX, JPG</span>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  className="px-6 py-3 font-semibold text-white transition rounded-lg shadow-md bg-btn hover:bg-sky-700 focus:outline-none focus:ring-2"
                >
                  Assign Homework
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AddHomeworkPage;
