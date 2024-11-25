import React from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,IconButton,Button } from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import axios from 'axios';
import { useState,useEffect } from 'react';
const TableListingteacher = ({id}) => {

    const [teacher,setTeacher] = useState("");

    useEffect(()=>{
        async function getteachers(){
            const res = await axios.get("http://localhost:3000/getteacher/"+id);
            console.log(res.data.teacher);
            setTeacher(res.data.teacher);
        }
        getteachers();
    },[]);

  return (
    <>
      
            <TableRow key={teacher}> 
              <TableCell>{teacher.name}</TableCell>
              <TableCell>{teacher.email}</TableCell>
              <TableCell>{teacher.contact}</TableCell>
              <TableCell>
              <Button variant="contained" color="primary" size="small">
                  View
                </Button>
              
              </TableCell>
              <TableCell>
              <Button variant="outlined" color="error" size="small">
                  Delete
                </Button>
                </TableCell>
            </TableRow>
    
    
    </>
  )
}

export default TableListingteacher