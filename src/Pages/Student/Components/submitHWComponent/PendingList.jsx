import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../../../InitialPages/Loader";

const PendingList = () => {
  const navigate = useNavigate();
  let [PendingHomeWork, setPendingHomework] = useState([]);
  let [SubmittedHomeWork, setSubmittedHomeWork] = useState([]);
  const [loading, setLoading] = useState(true);
  const savedAuth = JSON.parse(localStorage.getItem("auth"));

  async function fetchPendingHomework() {
    try {
      let res = await axios.get(
        `http://localhost:3000/student/${savedAuth.id}/pending-homeworks`
      );
      setPendingHomework(res.data.homeworks);
    } catch (err) {
      console.log(err);
    }
  }

  async function fetchSubmittedHomework() {
    try {
      let res = await axios.get(
        `http://localhost:3000/student/${savedAuth.id}/submitted-homeworks`
      );
      setSubmittedHomeWork(res.data.homeworks);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchPendingHomework();
    fetchSubmittedHomework();
  }, []);

  if (loading) {
    return <Loader text={"Loading Homework..."} />;
  }

  return (
    <>
      <div className="flex flex-col gap-4 p-4">
        <div>
          <h1 className="text-2xl font-semibold mb-2">Pending Homework</h1>
          <hr className="mb-4 border-b-2 border-gray-200" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {PendingHomeWork.map((pendingItem) => (
              <div
                key={pendingItem._id}
                className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:bg-gray-50"
                onClick={() =>
                  navigate(`/student/${pendingItem._id}/pending-homework`)
                }
              >
                <div className="flex items-center mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-purple-500 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <span className="font-semibold text-black">Class:</span>{" "}
                  {pendingItem.subject}
                </div>
                <p className="text-gray-700">
                  <span className="font-semibold text-black">Title:</span>{" "}
                  {pendingItem.title}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold text-black">Description:</span>{" "}
                  {pendingItem.description}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold text-black">Deadline:</span>{" "}
                  {pendingItem.dueDate.split("T")[0]}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h1 className="text-2xl font-semibold mb-2">Submitted Homework</h1>
          <hr className="mb-4 border-b-2 border-gray-200" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SubmittedHomeWork.map((homework) => (
              <div
                key={homework._id}
                className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:bg-gray-50"
                onClick={() =>
                  navigate(`/student/homework/${homework._id}/preview`)
                }
              >
                <div className="flex items-center mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-green-500 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <span className="font-semibold text-black">Class:</span>{" "}
                  {homework.subject}
                </div>
                <p className="text-gray-700">
                  <span className="font-semibold text-black">Title:</span>{" "}
                  {homework.title}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold text-black">Description:</span>{" "}
                  {homework.description}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold text-black">Deadline:</span>{" "}
                  {homework.dueDate.split("T")[0]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PendingList;