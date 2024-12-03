import { useParams } from "react-router-dom"; // To access the ID from the URL
import { useState, useEffect } from "react";
import axios from "axios";

const Test = () => {
  const { id } = useParams(); // Extract the student ID from the URL
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/admin/students/${id}`
        ); // Fetch data for the specific student
        setStudent(res.data);
      } catch (error) {
        console.error("Error fetching student data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
    console.log("Student ID from URL:", id);
  }, [id]);

  if (loading) {
    return <div className="text-center mt-8">Loading Student Profile...</div>;
  }

  if (!student) {
    return <div className="text-center mt-8">Student not found.</div>;
  }
 

  return (
    <div className="flex flex-col items-center mt-8">
      <h1 className="text-2xl font-bold">Student Profile</h1>
      <div className="mt-5 p-5 bg-gray-100 rounded shadow-md w-96">
        <p className="text-lg">
          <strong>Name:</strong> {student.name}
        </p>
        <p className="text-lg">
          <strong>Email:</strong> {student.email}
        </p>
        <p className="text-lg">
          <strong>{JSON.stringify(student.presentDays) }</strong>

        </p>
        <p>{student.presentDays}</p>
        <p>{student.absentDays}</p>
      </div>
    </div>
  );
};

export default Test;
