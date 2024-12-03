import React, { useState, useEffect } from 'react';
import SideNavbar from '../../../components/SideNavbar';
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import TableListingstudent from '../Components/TableListingstudent';
import TableListingteacher from '../Components/TableListingteacher';
import Addstudenttoclassroom from '../Components/Addstudenttoclassroom';
import Addteachertoclassroom from "../Components/Addteachertoclassroom";
const Classroom = () => {

    const { id } = useParams();
  const [classroom, setClassroom] = useState(null);
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);

  const savedAuth = JSON.parse(localStorage.getItem("auth"));

  useEffect(() => {
    async function fetchClassroom() {
      try {
        const res = await axios.get(`http://localhost:3000/classroom/${id}`);
        setClassroom(res.data.classroom);
        console.log(res.data);

        
       
      } catch (error) {
        console.error('Error fetching classroom data:', error);
      }
    }


    async function fetchStudentsforadmin() {
      try {
        const res = await axios.get(`http://localhost:3000/admin/${savedAuth.id}/students`);
        
       
        setStudents(res.data.students);

        
       
      } catch (error) {
        console.error('Error fetching classroom data:', error);
      }
    }
    async function fetchTeachersforadmin() {
      try {
        const res = await axios.get(`http://localhost:3000/admin/${savedAuth.id}/teachers`);
        
        console.log(res.data.teachers);
        setTeachers(res.data.teachers);
        

        
       
      } catch (error) {
        console.error('Error fetching classroom data:', error);
      }
    }

  

    fetchClassroom();
    fetchStudentsforadmin();
    fetchTeachersforadmin();
  }, [id]);

  const addStudentFunction = async (selectedstudentList) => {
    try {

      console.log("This are the students to add",selectedstudentList);
      const promises = selectedstudentList.map(async (student) => {
        const res = await axios.post(`http://localhost:3000/classroom/${id}/assign-student`, {
          email: student.email,
        });
        return res.data.student;
      });

      const addedStudents = await Promise.all(promises);
      console.log("This are the students added",addedStudents);
      setStudents((prevStudents) => [...prevStudents, ...addedStudents]);
      window.location.reload();
      console.log('Students added:', addedStudents);
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  const Addteacherfunction = async (selectedTeacherlist) =>{

    try {

      console.log("This are the students to add",selectedTeacherlist);
      const promises = selectedTeacherlist.map(async (teacher) => {
        const res = await axios.post(`http://localhost:3000/classroom/${id}/assign-teacher`, {
          email: teacher.email,
        });
        return res.data.teacher;
      });

      const addedteacher = await Promise.all(promises);
      console.log("This are the teacher added",addedteacher);
      setTeachers((prevTeachers) => [...prevTeachers, ...addedteacher]);
      window.location.reload();
      console.log('Students added:', addedteacher);
    } catch (error) {
      console.error('Error adding student:', error);
    }

  };

 

 


  return (
<>
<div className="flex min-h-screen bg-gray-100">
    
        <SideNavbar />

        <div className="flex-1 p-8">


        <Box className="p-8">
     

      {classroom ? (
     <>

<div className='flex justify-between mb-10'>

      <Typography variant="h4" className="mb-4">{classroom.name} Classroom Details</Typography>
      <Button variant="contained" color="primary" className='mb-4'>
          Edit Classroom
        </Button>
        </div>

      
      <div className='flex justify-between'>
      

      <Typography variant="h5" className="mb-4">Students</Typography>
     <Addstudenttoclassroom students={students} onAddStudent={addStudentFunction} />
        </div>
      <TableContainer component={Paper} className="mb-4">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Contact no</TableCell>
              <TableCell>Action</TableCell>
              <TableCell> Delete </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {classroom.students.map((student) => (
                    <TableListingstudent id={student}/>
                  ))}
            
          </TableBody>
        </Table>
      </TableContainer>

      <div className='flex justify-between'>

      <Typography variant="h5" className="mb-4">Teachers</Typography>
      < Addteachertoclassroom teachers={teachers} onAddTeacher={Addteacherfunction} />
        </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Contact no</TableCell>
              <TableCell>Action</TableCell>
              <TableCell> Delete </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {classroom.teachers.map((teacher) => (
                    <TableListingteacher id={teacher}/>
                  ))}
          </TableBody>
        </Table>
      </TableContainer>
      </>
      ):(
        <>
        <h1>No nothing</h1>
        </>
      )}

      
    </Box>
        </div>


        
        </div>


</>
  )
}

export default Classroom