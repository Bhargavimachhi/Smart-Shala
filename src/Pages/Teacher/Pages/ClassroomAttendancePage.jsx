import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  TableCell,
  TableRow,
  TableBody,
  TableContainer,
  Paper,
  Table,
  TableHead,
  Checkbox,
  Button,
} from "@mui/material";
import toast from "react-hot-toast";
import { ICONS } from "../Icons/icons";
import TeacherLoader from "../Components/TeacherLoader";

const ClassroomAttendancePage = () => {
  const { classroomId } = useParams();
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      const savedAuth = JSON.parse(localStorage.getItem("auth"));
      if (savedAuth && savedAuth.id) {
        const res = await axios.get(
          `http://localhost:3000/teacher/${savedAuth.id}/classrooms/${classroomId}/manual-attendance`
        );
        setStudents(res.data.students);
        setLoading(false);
      } else {
        setLoading(false);
      }
    };
    fetchStudents();
  }, [classroomId]);

  const markAttendance = async (studentId, status) => {
    const url =
      status === "present"
        ? `http://localhost:3000/student/${studentId}/attendance/present`
        : `http://localhost:3000/student/${studentId}/attendance/absent`;
    await axios.get(url);
    window.location.reload();
  };

  if (loading) {
    return <TeacherLoader text="Loading Students..." />;
  }

  return (
    <main>
      <div className="bg-white">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 mb-6 border-b border-btn">
          <div className="flex items-center gap-2 text-text">
            <span>
              <ICONS.STUDENT size={30} />
            </span>
            <h1 className="font-semibold md:text-2xl">Classroom Attendance</h1>
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
        <div className="w-full mb-6 overflow-x-auto">
          <div className="flex-1 p-4 transition-all duration-300">
            <TableContainer
              component={Paper}
              className="rounded-lg shadow-lg"
              sx={{
                maxHeight: 500, // optional: limits height and makes it scrollable vertically
              }}
            >
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell className="!font-bold  !bg-bg">Name</TableCell>
                    <TableCell className="!font-bold  !bg-bg">Email</TableCell>
                    <TableCell className="!font-bold  !bg-bg">
                      Present / Absent
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {students.map((student, index) => (
                    <TableRow
                      key={student._id}
                      className={`transition-all duration-200 ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      } hover:bg-blue-50`}
                    >
                      <TableCell className="px-6 py-4">
                        {student.name}
                      </TableCell>
                      <TableCell className="px-6 py-4">
                        {student.email}
                      </TableCell>
                      <TableCell className="px-6 py-4">
                        <Checkbox
                          color="success"
                          checked={student.presentDays.includes(
                            new Date().toISOString().split("T")[0]
                          )}
                          onClick={(e) => {
                            markAttendance(
                              student._id,
                              e.target.checked ? "present" : "absent"
                            );
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ClassroomAttendancePage;
