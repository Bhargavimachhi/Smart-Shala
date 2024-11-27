import React from 'react'
import TeacherLeftSideNavBar from '../Components/TeacherLeftSideNavBar';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Dialog, DialogTitle, DialogContent, IconButton, CardHeader,Button } from '@mui/material';



const TeachersClassroom = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [classrooms, setClassrooms] = useState([]);

    const toggleSidebar = () => {
        setIsExpanded(!isExpanded);
      };

      useEffect(() => {
        async function getClassrooms() {
          const res = await axios.get("http://localhost:3000/teacher/673ef420199ddbcc9cd57bed/classrooms");
          console.log(res.data.classrooms);
          setClassrooms(res.data.classrooms);
        }
    
        getClassrooms();
      }, []);



  return (
   <>

<div className="flex min-h-screen bg-gray-100">
      <TeacherLeftSideNavBar isExpanded={isExpanded} toggleSidebar={toggleSidebar} />
      <div className="flex-1 p-8">
        
        <h1 className="text-2xl font-bold text-center mb-8">Your Classrooms</h1>

        {classrooms && classrooms.length > 0 ? (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ml-10">
            <>
              {classrooms.map((classroom) => {
                return (
                  
                  <Card className="relative mb-8 h-48" key={classroom.id}>
                   
                    <CardContent className="flex flex-col justify-center items-center h-full relative">
                      <Typography variant="h5" className="font-bold text-blue-600 text-center">
                        {classroom.name}
                      </Typography>
                    </CardContent>
                  </Card>
                );
              })}
            </>
          </div>
          ) : (
            <div className="text-center mt-8">
              <p className="text-gray-500">No classrooms found available.</p>
            </div>
          )}


    
      </div>
    </div>
   
   </>
  )
}

export default TeachersClassroom