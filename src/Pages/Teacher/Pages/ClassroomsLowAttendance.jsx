import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { ICONS } from "../Icons/icons";
import TeacherLoader from "../Components/TeacherLoader";

const ClassroomsLowAttendance = () => {
  const [classroomsData, setClassroomsData] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const savedAuth = JSON.parse(localStorage.getItem("auth"));
  const teacherId = savedAuth ? savedAuth.id : null;
  const [selectedStudents, setSelectedStudents] = useState({});
  const audioRef = useRef(null); // Reference for audio element

  useEffect(() => {
    const fetchClassroomsData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:3000/teacher/${teacherId}/classrooms-low-attendance`
        );
        setClassroomsData(response.data.classroomsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setMessage("Error fetching data");
      }
    };

    fetchClassroomsData();
  }, [teacherId]);

  const handleCheckboxChange = (classroomId, studentId) => {
    setSelectedStudents((prevState) => {
      const newState = { ...prevState };
      if (!newState[classroomId]) {
        newState[classroomId] = {};
      }
      newState[classroomId][studentId] = !newState[classroomId][studentId];
      return newState;
    });
  };

  const handleSendEmails = async () => {
    const studentsToSendEmails = [];
    for (const classroomId in selectedStudents) {
      for (const studentId in selectedStudents[classroomId]) {
        if (selectedStudents[classroomId][studentId]) {
          const classroom = classroomsData.find(
            (c) => c.classroom._id === classroomId
          );
          const student = classroom.lowAttendanceStudents.find(
            (s) => s._id === studentId
          );
          studentsToSendEmails.push(student.email);
        }
      }
    }

    try {
      const response = await axios.post(`http://localhost:3000/send-emails`, {
        students: studentsToSendEmails,
      });
      setMessage(response.data.message);
      playSound(); // Play sound on successful email sending
    } catch (error) {
      console.error("Error sending emails:", error);
      setMessage("Error sending emails");
    }
  };

  const handleSendSMS = async () => {
    const studentsToSendSMS = [];
    for (const classroomId in selectedStudents) {
      for (const studentId in selectedStudents[classroomId]) {
        if (selectedStudents[classroomId][studentId]) {
          const classroom = classroomsData.find(
            (c) => c.classroom._id === classroomId
          );
          const student = classroom.lowAttendanceStudents.find(
            (s) => s._id === studentId
          );
          studentsToSendSMS.push("+91" + JSON.stringify(student.contact));
        }
      }
    }

    try {
      const response = await axios.post(
        `http://localhost:3000/teacher/send-low-attendance-sms`,
        { students: studentsToSendSMS }
      );
      setMessage(response.data.message);
    } catch (error) {
      console.error("Error sending SMS:", error);
      setMessage("Error sending SMS");
    }
  };

  if (loading) {
    return <TeacherLoader text="Loading Classrooms..." />;
  }

  return (
    <main>
      <div className="bg-white">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 mb-6 border-b border-btn">
          <div className="flex items-center gap-2 text-text">
            <span>
              <ICONS.CHECK_ATTENDANCE size={30} />
            </span>
            <h1 className="text-2xl font-semibold ">
              Classrooms and Students with Low Attendance
            </h1>
          </div>
        </div>
        {/* Error Sending Email */}
        {message && <p className="my-4 text-center text-red-500">{message}</p>}
        {/* Classrooms */}
        <div className="grid grid-cols-1 gap-6 px-4 md:grid-cols-2 lg:grid-cols-3 md:px-6">
          {classroomsData.map(({ classroom, lowAttendanceStudents }) => (
            <div
              key={classroom._id}
              className="p-6 transition-all duration-300 border border-gray-200 shadow-lg bg-gradient-to-br from-white to-blue-50 rounded-xl hover:shadow-xl hover:-translate-y-1"
            >
              <h2 className="mb-4 text-2xl font-bold text-center text-btn">
                {classroom.name}
              </h2>

              {lowAttendanceStudents.length > 0 ? (
                <div>
                  <ul className="space-y-3">
                    {lowAttendanceStudents.map((student) => (
                      <li
                        key={student._id}
                        className="flex items-center justify-between p-3 transition duration-200 bg-white rounded-md shadow-sm hover:bg-blue-50"
                      >
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            className="w-5 h-5 mr-3 text-blue-600 rounded cursor-pointer form-checkbox"
                            checked={
                              selectedStudents[classroom._id]?.[student._id] ||
                              false
                            }
                            onChange={() =>
                              handleCheckboxChange(classroom._id, student._id)
                            }
                          />
                          <div className="flex flex-col">
                            <span className="font-medium text-gray-800">
                              {student.name}
                            </span>
                            <span className="text-sm text-text">
                              {student.email}
                            </span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="text-center text-gray-500">
                  No students with attendance below{" "}
                  <span className="font-semibold">75%</span>
                </p>
              )}
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center w-full gap-2">
          <button
            onClick={handleSendEmails}
            className="px-4 py-2 mt-8 mr-5 text-white transition bg-green-500 rounded-lg hover:bg-green-600"
          >
            Send Emails
          </button>

          <button
            onClick={handleSendSMS}
            className="px-4 py-2 mt-8 text-white transition bg-yellow-500 rounded-lg hover:bg-yellow-600"
          >
            Send SMS
          </button>
        </div>
      </div>
      {/* Audio element to play the sound */}
      <audio
        ref={audioRef}
        src="https://upload.wikimedia.org/wikipedia/commons/8/81/Alarm_or_siren.ogg"
      />
    </main>
  );
};

export default ClassroomsLowAttendance;
