import React from 'react';
import { Mail, Phone, MoreVertical, User, BookOpen, Database, Calendar } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { Card, CardContent, Typography, Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material';

import SideNavbar from '../../../components/SideNavbar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Info as InfoIcon } from '@mui/icons-material';
import TeacherListingrow from '../Components/TeacherListing';
import StudentListingrow from '../Components/StudentListing';
import Createclassroom from '../Components/Createclassroom';

const ClassroomListingpage = () => {
  const [classrooms, setClassrooms] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedClassroom, setSelectedClassroom] = useState(null);

  const handleOpenDetails = (classroom) => {
    setSelectedClassroom(classroom);
    setOpen(true);
  };

  const handleCloseDetails = () => {
    setOpen(false);
    setSelectedClassroom(null);
  };

  useEffect(() => {
    async function getClassrooms() {
      const res = await axios.get("http://localhost:3000/getclassrooms");
      console.log(res.data.classrooms);
      setClassrooms(res.data.classrooms);
    }

    getClassrooms();
  }, []);

  return (
    <>
      <div className="flex min-h-screen bg-gray-100">
        <SideNavbar />
        <div className="flex-1 p-8">
          <div className="mb-6 flex justify-between items-center">
            <h1 className="text-2xl font-bold mb-2">Your Classrooms</h1>
           
           <Createclassroom/>
          </div>

          {classrooms && classrooms.length > 0 ? (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <>
              {classrooms.map((classroom) => {
                return (
                  <Card className="relative mb-8" key={classroom.id} onClick={() => handleOpenDetails(classroom)}>
                    <CardContent>
                      <div className="flex justify-between items-center mb-4">
                        <Typography variant="h5" className="font-bold text-blue-600">
                          {classroom.name}
                        </Typography>
                        <IconButton color="primary" className="absolute top-2 right-2">
                          <InfoIcon />
                        </IconButton>
                      </div>
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

          <Dialog open={open} onClose={handleCloseDetails} maxWidth="md" fullWidth>
            <DialogTitle>Classroom Details</DialogTitle>
            <DialogContent>
              {selectedClassroom && (
                <>
                  {selectedClassroom.students.length > 0 ? (
                    <>
                      <Typography variant="h6" className="text-gray-700 mb-2">
                        Students
                      </Typography>
                      <div className="space-y-1">
                        <div className="mb-6">
                          <table className="w-full shadow-sm rounded-md">
                            <thead>
                              <tr className="bg-gray-100">
                                <th className="py-2 px-4 text-left">Name</th>
                                <th className="py-2 px-4 text-left">Roll No</th>
                              </tr>
                            </thead>
                            <tbody>
                              {selectedClassroom.students.map((student) => {
                                return <StudentListingrow id={student} key={student} />;
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </>
                  ) : (
                    <Typography variant="body1" className="text-gray-500">
                      No students found.
                    </Typography>
                  )}

                  {selectedClassroom.teachers.length > 0 ? (
                    <>
                      <Typography variant="h6" className="text-gray-700 mb-2">
                        Teachers
                      </Typography>
                      <div className="space-y-1">
                        <div className="mb-6">
                          <table className="w-full shadow-sm rounded-md">
                            <thead>
                              <tr className="bg-gray-100">
                                <th className="py-2 px-4 text-left">Name</th>
                                <th className="py-2 px-4 text-left">Roll No</th>
                              </tr>
                            </thead>
                            <tbody>
                              {selectedClassroom.teachers.map((teacher) => {
                                return <TeacherListingrow id={teacher} key={teacher} />;
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </>
                  ) : (
                    <Typography variant="body1" className="text-gray-500">
                      No teachers found.
                    </Typography>
                  )}
                </>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </>
  );
};

export default ClassroomListingpage;