import React from 'react'
import SideNavbar from '../../../components/SideNavbar'
import { useState,useEffect } from 'react';
import axios from 'axios';
import { 
    Card,
    CardContent,
    Typography,
    Chip,
    Box,
    Divider,
    Button
  } from '@mui/material';
  import {
    Warning as WarningIcon,
    CheckCircle as CheckCircleIcon,
    School as SchoolIcon,
    ErrorOutline as ErrorIcon,
    Info as InfoIcon
  } from '@mui/icons-material';

const Issuessection = () => {

    const [issues, setIssues] = useState([]);
    const [classroomnames,setClassroomNames] = useState([]);


    async function getclassroomnamebyid(id){
        console.log(id);
        const res = await axios.get("http://localhost:3000/getclassroom/"+id);
        console.log(res.data.classroom.name);
        return res.data.classroom.name;
    }

    const markResolved = async (issueId) => {

      const res = await axios.get(`http://localhost:3000/issue/${issueId}/resolve`);
      console.log(res.data);
      if(res.data.message === "Issue Resolved Successfully"){
        window.location.reload();
        
      }

    };
    const markUnResolved = async (issueId) => {

      const res = await axios.get(`http://localhost:3000/issue/${issueId}/refuse`);
      console.log(res.data);
      if(res.data.message === "Issue Marked as Not Resolved Successfully"){
        window.location.reload();
      };
    };


    useEffect(() => {
        async function getIssues() {
          const res = await axios.get("http://localhost:3000/getclassrooms");
          const classrooms = res.data.classrooms;
  
          const issuePromises = classrooms.flatMap(classroom =>
            classroom.issues.map(async issueId => {
              const issueRes = await axios.get(`http://localhost:3000/issue/${issueId}`);
              const classroomName = await getclassroomnamebyid(classroom._id);
              return {
                ...issueRes.data.issue,
                classroomName 
              };
            })
          );
  
          const issuesData = await Promise.all(issuePromises);
          console.log(issuesData);
          setIssues(issuesData);
              


              
          }

    
        getIssues();
      }, []);

      const resolvedissues = issues.filter(issue => issue.isResolved);
      const unresolvedissues = issues.filter(issue => !issue.isResolved);






  return (
    <>
    <div className="flex min-h-screen bg-gray-100">
   <SideNavbar/>
   <div className="flex-1 p-8">
          <div className="mb-6 flex justify-between items-center">
            <h1 className="text-2xl font-bold mb-2">Your Issues</h1>
           
           
          </div>

          
          
      {/* {issues && issues.length > 0 ? (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <>
              {issues.map((issue) => {
                return (
                  
                 <Card 
      className={`
        max-w-md w-full 
       
        hover:shadow-lg transition-shadow duration-200
        bg-white
      `}
    >
      <CardContent>
     
        <Box className="flex justify-between items-start mb-3">
          <Box className="flex items-center space-x-2">
            <SchoolIcon className="text-gray-500" />
            <Typography variant="subtitle2" className="text-gray-600">
           {issue.classroomName}
            </Typography>

            
          </Box>
         
        </Box>

        <Typography variant="h6" className="font-semibold mb-2">
        {issue.description}
        </Typography>
        <Typography variant="body2" className="text-gray-600 mb-4">
          {issue.severity}
        </Typography>

        <Divider className="my-3" />

    
        <Box className="flex justify-between items-center mt-2">
          <Box className="flex items-center space-x-2">
          <WarningIcon className={issue.isResolved ? "text-green-500" : "text-yellow-500"} />
    <Typography variant="body2" className={issue.isResolved ? "text-green-600" : "text-yellow-600"}>
      {issue.isResolved ? "Done" : "Pending"}
    </Typography>
              
          </Box>
          <Typography variant="caption" className="text-gray-500">
            Reported on: {issue.issueDate}
          </Typography>
        </Box>

        {issue.isResolved ? (
                          <Button
                          variant="contained"
                          color="primary"
                          className="mt-4"
                          onClick={() => markUnResolved(issue._id)}
                        >
                          Mark as Unresolved
                        </Button>
                        ) : (
                         
                           <Button
                           variant="contained"
                           color="primary"
                           className="mt-4"
                           onClick={() => markResolved(issue._id)}
                           
                         >
                           Mark as Resolved
                         </Button>
                        )}
      </CardContent>
    </Card>
                );
              })}
            </>
          </div>
          ) : (
            <div className="text-center mt-8">
              <p className="text-gray-500">No Issues found available.</p>
            </div>
          )} */}

{unresolvedissues.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-4">Unresolved Issues</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {unresolvedissues.map((issue) => (
                <Card
                  key={issue.id}
                  className="max-w-md w-full hover:shadow-lg transition-shadow duration-200 bg-white"
                >
                  <CardContent>
                    <Box className="flex justify-between items-start mb-3">
                      <Box className="flex items-center space-x-2">
                        <SchoolIcon className="text-gray-500" />
                        <Typography variant="subtitle2" className="text-gray-600">
                          {issue.classroomName}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography variant="h6" className="font-semibold mb-2">
                      {issue.description}
                    </Typography>
                    <Typography variant="body2" className="text-gray-600 mb-4">
                      {issue.severity}
                    </Typography>
                    <Box className="flex justify-between items-center mt-2">
                      <Box className="flex items-center space-x-2">
                      <WarningIcon className={issue.isResolved ? "text-green-500" : "text-yellow-500"} />
    <Typography variant="body2" className={issue.isResolved ? "text-green-600" : "text-yellow-600"}>
      {issue.isResolved ? "Done" : "Pending"}
    </Typography>
                      </Box>
                      <Typography variant="caption" className="text-gray-500">
                        Reported on: {issue.issueDate}
                      </Typography>
                    </Box>
                    {issue.isResolved ? (
                          <Button
                          variant="contained"
                          color="primary"
                          className="mt-4"
                          onClick={() => markUnResolved(issue._id)}
                        >
                          Mark as Unresolved
                        </Button>
                        ) : (
                         
                           <Button
                           variant="contained"
                           color="primary"
                           className="mt-4"
                           onClick={() => markResolved(issue._id)}
                           
                         >
                           Mark as Resolved
                         </Button>
                        )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
            {resolvedissues.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-4">Resolved Issues</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resolvedissues.map((issue) => (
                <Card
                  key={issue.id}
                  className="max-w-md w-full hover:shadow-lg transition-shadow duration-200 bg-white"
                >
                  <CardContent>
                    <Box className="flex justify-between items-start mb-3">
                      <Box className="flex items-center space-x-2">
                        <SchoolIcon className="text-gray-500" />
                        <Typography variant="subtitle2" className="text-gray-600">
                          {issue.classroomName}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography variant="h6" className="font-semibold mb-2">
                      {issue.description}
                    </Typography>
                    <Typography variant="body2" className="text-gray-600 mb-4">
                      {issue.severity}
                    </Typography>
                    <Box className="flex justify-between items-center mt-2">
                      <Box className="flex items-center space-x-2">
                      <WarningIcon className={issue.isResolved ? "text-green-500" : "text-yellow-500"} />
    <Typography variant="body2" className={issue.isResolved ? "text-green-600" : "text-yellow-600"}>
      {issue.isResolved ? "Done" : "Pending"}
    </Typography>
                      </Box>
                      <Typography variant="caption" className="text-gray-500">
                        Reported on: {issue.issueDate}
                      </Typography>
                    </Box>
                    {issue.isResolved ? (
                          <Button
                          variant="contained"
                          color="primary"
                          className="mt-4"
                          onClick={() => markUnResolved(issue._id)}
                        >
                          Mark as Unresolved
                        </Button>
                        ) : (
                         
                           <Button
                           variant="contained"
                           color="primary"
                           className="mt-4"
                           onClick={() => markResolved(issue._id)}
                           
                         >
                           Mark as Resolved
                         </Button>
                        )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}


   
   



        
      
        </div>


      
    </div>
    </>
   
  )
}

export default Issuessection