import React, { useState, useEffect } from 'react';
import SideNavbar from '../../../components/SideNavbar';
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import TableListingstudent from '../Components/TableListingstudent';
import TableListingteacher from '../Components/TableListingteacher';
const Classroom = () => {

    const { id } = useParams();
  const [classroom, setClassroom] = useState(null);

  useEffect(() => {
    async function fetchClassroom() {
      try {
        const res = await axios.get(`http://localhost:3000/classroom/${id}`);
        setClassroom(res.data.classroom);
        console.log(res.data.classroom);
        
       
      } catch (error) {
        console.error('Error fetching classroom data:', error);
      }
    }

    fetchClassroom();
  }, [id]);
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
      <Button variant="contained" color="primary" className='mb-4 '>
          Add Students
        </Button>
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
      <Button variant="contained" color="primary" className='mb-4'>
          Add Teacher
        </Button>
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