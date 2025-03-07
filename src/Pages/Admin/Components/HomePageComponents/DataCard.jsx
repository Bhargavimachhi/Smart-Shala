import { TeacherIcon } from "../../Icons/NavIcon";
import { StudentIcon } from "../../Icons/NavIcon";
import { useState, useEffect } from "react";
import axios from "axios";
const DataCard = () => {
  const savedAuth = JSON.parse(localStorage.getItem("auth"));
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    async function getAdmin() {
      const res = await axios.get(
        `http://localhost:3000/admin/${savedAuth.id}`
      );
      setAdmin(res.data.admin);
    }
    getAdmin();
  }, []);

  return (
    <div className="flex flex-wrap">
      <div className="flex items-center justify-between w-64 p-2 mr-10 bg-white rounded-lg shadow-lg h-18">
        <div>
          <p className="font-medium text-gray-500">Students</p>
          <p className="text-3xl font-bold text-blue-600">
            {admin && admin.students.length}
          </p>
        </div>
        <div>
          <img
            src={StudentIcon}
            alt={`Students Icon`}
            className="w-12 h-12 text-blue-600"
          />
        </div>
      </div>
      <div className="flex items-center justify-between w-64 p-4 mr-10 bg-white rounded-lg shadow-lg h-18">
        <div>
          <p className="font-medium text-gray-500">Teachers</p>
          <p className="text-3xl font-bold text-blue-600">
            {admin && admin.teachers.length}
          </p>
        </div>
        <div>
          <img
            src={TeacherIcon}
            alt={`Techears Icon`}
            className="w-12 h-12 text-blue-600"
          />
        </div>
      </div>
      <div className="flex items-center justify-between w-64 p-4 bg-white rounded-lg shadow-lg h-18">
        <div>
          <p className="font-medium text-gray-500">Classrooms</p>
          <p className="text-3xl font-bold text-blue-600">
            {admin && admin.classrooms.length}
          </p>
        </div>
        <div>
          <img
            src={StudentIcon}
            alt={`Classroom Icon`}
            className="w-12 h-12 text-blue-600"
          />
        </div>
      </div>
    </div>
  );
};

export default DataCard;
