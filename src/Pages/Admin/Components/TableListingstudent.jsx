import React from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,IconButton,Button } from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import axios from 'axios';
import { useState,useEffect } from 'react';
const TableListingstudent = ({id}) => {

  const [student,setStudent] = useState("");

  useEffect(()=>{
      async function getstudents(){
          const res = await axios.get("http://localhost:3000/getstudent/"+id);
          console.log(res.data.student);
          setStudent(res.data.student);
      }
      getstudents();
  },[]);

  return (
    <>
    
          
           <TableRow key={student}> 
              <TableCell>{student.name}</TableCell>
              <TableCell>{student.rollno}</TableCell>
              <TableCell>{student.email}</TableCell>
              <TableCell>
                <Button variant="contained" color="primary" size="small">
                  View
                </Button>
              </TableCell>
            </TableRow>
    
    
    </>
  )
}

export default TableListingstudent