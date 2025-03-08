import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

const TeacherListingrow = ({ id }) => {
  const [teacher, setTeacher] = useState("");

  useEffect(() => {
    async function getteachers() {
      const res = await axios.get("http://localhost:3000/getteacher/" + id);
      console.log(res.data.teacher);
      setTeacher(res.data.teacher);
    }
    getteachers();
  }, []);

  return (
    <>
      <tr className="transition duration-150 hover:bg-gray-200">
        <td className="px-4 py-2">{teacher.name}</td>
        <td className="px-4 py-2">{teacher.email}</td>
        <td className="px-4 py-2">{teacher.contact}</td>
      </tr>
    </>
  );
};

export default TeacherListingrow;
