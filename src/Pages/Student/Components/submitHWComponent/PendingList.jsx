import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const PendingList = () => {
  const navigate = useNavigate();
  let [PendingHomeWork, setPendingHomework] = useState([]);
  const [loading, setLoading] = useState(true);
  const savedAuth = JSON.parse(localStorage.getItem("auth"));

  async function fetchPendingHomework() {
    try {
      let res = await axios.get(`http://localhost:3000/student/${savedAuth.id}/pending-homeworks`);
      setPendingHomework(res.data.homeworks);
      setLoading(false);

    } catch(err) {
      console.log(err);
    }
  };

  useEffect(()=> {
    fetchPendingHomework();
      
  },[]);

  if (loading) {
    return <div className="text-center mt-8">Loading Homeworks...</div>;
  }

  return (
    <div className="p-4 m-5">
      <h1 className="text-2xl font-bold mb-4 border-gray-100 border-b-2 p-2 text-center">
        Pending Homework
      </h1> 
      <ul className="space-y-4 mb-3">
        {PendingHomeWork.map((pendingItem) => (
          <li
            key={pendingItem._id}
            className="p-4 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200"
            onClick={() => {
              navigate(`/student/${pendingItem._id}/pending-homework`);
              return null;
            }}
          >
            <h2 className="text-lg font-semibold">Class : {pendingItem.subject}</h2>
            <p className="text-gray-600">Title: {pendingItem.title}</p>
            <p className="text-gray-600">Description: {pendingItem.description}</p>
            <p className="text-gray-600">Deadline: {pendingItem.dueDate.split("T")[0]}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PendingList;
