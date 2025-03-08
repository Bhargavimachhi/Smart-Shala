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
      <div className={`flex-1 transition-all duration-300 p-2 overflow-x-auto`}>
        <div className="p-2 mb-2">
          <h1 className="p-2 mb-2 text-2xl font-semibold text-start text-text">
            Pending Homework
          </h1>
          <hr className="mb-2 border border-b-border" />
          <ul className="mb-3 space-y-4">
            {PendingHomeWork.map((pendingItem) => (
              <li
                key={pendingItem._id}
                className="p-4 rounded-lg cursor-pointer bg-bg hover:bg-gray-200"
                onClick={() => {
                  navigate(`/student/${pendingItem._id}/pending-homework`);
                  return null;
                }}
              >
                <h2 className="text-xl font-semibold">
                  <span className="font-semibold text-black">Class</span>:{" "}
                  {pendingItem.subject}
                </h2>
                <p className="text-text">
                  <span className="font-semibold text-black">Title</span>:{" "}
                  {pendingItem.title}
                </p>
                <p className="text-text">
                  <span className="font-semibold text-black">
                    Description :{" "}
                  </span>
                  {pendingItem.description}
                </p>
                <p className="text-text">
                  <span className="font-semibold text-black">Deadline : </span>
                  {pendingItem.dueDate.split("T")[0]}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div className="p-2 mb-2">
          <h1 className="p-2 mb-2 text-2xl font-semibold text-start text-text">
            Submitted Homework
          </h1>
          <hr className="mb-2 border border-b-border" />
          <ul className="mb-3 space-y-4">
            {SubmittedHomeWork.map((homework) => (
              <li
                key={homework._id}
                className="p-4 rounded-lg cursor-pointer bg-bg hover:bg-gray-200"
                onClick={() => {
                  navigate(`/student/homework/${homework._id}/preview`);
                  return null;
                }}
              >
                <h2 className="text-xl font-semibold text-btn">
                  Class : {homework.subject}
                </h2>
                <p className="text-text">
                  <span className="font-semibold text-black">Title : </span>
                  {homework.title}
                </p>
                <p className="text-text">
                  <span className="font-semibold text-black">
                    Description :{" "}
                  </span>
                  {homework.description}
                </p>
                <p className="text-text">
                  <span className="font-semibold text-black">Deadline : </span>
                  {homework.dueDate.split("T")[0]}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default PendingList;
