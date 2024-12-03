import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Attendance.css'

const AttendanceIndividual = () => {
  const { id } = useParams(); // Fetch ID from the URL
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/admin/students/${id}`);
        setStudent(res.data);
      } catch (error) {
        console.error('Error fetching student data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStudentData();
  }, [id]);

  const tileClassName = ({ date }) => {
    if (!student) return '';

    const dateString = date.toISOString().split('T')[0]; // Convert date to YYYY-MM-DD
    if (student.presentDays.includes(dateString)) return 'present';
    if (student.absentDays.includes(dateString)) return 'absent';
    return '';
  };

  if (loading) return <div>Loading...</div>;
  if (!student) return <div>Student not found</div>;

  return (
    <div>
      <h1>AttendanceIndividual for Student {id}</h1>
      <Calendar tileClassName={tileClassName} />
    </div>
  );
};

export default AttendanceIndividual;
