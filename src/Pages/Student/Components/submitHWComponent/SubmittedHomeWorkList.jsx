import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const SubmittedHomeWorkList = () => {
  const navigate = useNavigate();
  let [student, setStudent] = useState([]);
  const [loading, setLoading] = useState(true);
  const savedAuth = JSON.parse(localStorage.getItem("auth"));

  async function fetchHomework() {
    try {
      let res = await axios.get(`http://localhost:3000/student/${savedAuth.id}`);
      setStudent(res.data.homeworks);
      setLoading(false);

    } catch(err) {
      console.log(err);
    }
  };

  useEffect(()=> {
    fetchHomework();
      
  },[]);

  if (loading) {
    return <div className="text-center mt-8">Loading Homeworks...</div>;
  }

  return (
    <div className="p-4 m-5">
      <h1 className="text-2xl font-bold mb-4 border-gray-100 border-b-2 p-2 text-center">
        Submitted Homework
      </h1> 
      <ul className="space-y-4 mb-3">
        {student.submittedHomeworks.map((homework) => (
          <li
            key={homework._id}
            className="p-4 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200"
            onClick={() => {
              navigate(`/student/${pendingItem._id}/pending-homework`);
              return null;
            }}
          >
            <h2 className="text-lg font-semibold">Class : {homework.subject}</h2>
            <p className="text-gray-600">Title: {homework.title}</p>
            <p className="text-gray-600">Description: {homework.description}</p>
            <p className="text-gray-600">Deadline: {homework.dueDate.split("T")[0]}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubmittedHomeWorkList;
