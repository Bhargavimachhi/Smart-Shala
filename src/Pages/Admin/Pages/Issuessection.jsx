import React from "react";
import SideNavbar from "../../../components/SideNavbar";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  Divider,
  Button,
} from "@mui/material";
import {
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  School as SchoolIcon,
  ErrorOutline as ErrorIcon,
  Info as InfoIcon,
} from "@mui/icons-material";
import Loader from "../../InitialPages/Loader";

const Issuessection = () => {
  const [issues, setIssues] = useState([]);
  const [classroomnames, setClassroomNames] = useState([]);
  const savedAuth = JSON.parse(localStorage.getItem("auth"));
  const [loading, setLoading] = useState(true);

  async function getclassroomnamebyid(id) {
    const res = await axios.get("http://localhost:3000/classroom/" + id);
    return res.data.classroom.name;
  }

  const markResolved = async (issueId) => {
    const res = await axios.get(
      `http://localhost:3000/issue/${issueId}/resolve`
    );
    if (res.data.message === "Issue Resolved Successfully") {
      window.location.reload();
    }
  };
  const markUnResolved = async (issueId) => {
    const res = await axios.get(
      `http://localhost:3000/issue/${issueId}/refuse`
    );
    if (res.data.message === "Issue Marked as Not Resolved Successfully") {
      window.location.reload();
    }
  };

  useEffect(() => {
    async function getIssues() {
      const res = await axios.get(
        `http://localhost:3000/admin/${savedAuth.id}/classrooms`
      );
      const classrooms = res.data.classrooms;

      const issuePromises = classrooms.flatMap((classroom) =>
        classroom.issues.map(async (issueId) => {
          const issueRes = await axios.get(
            `http://localhost:3000/issue/${issueId}`
          );
          const classroomName = await getclassroomnamebyid(classroom._id);
          return {
            ...issueRes.data.issue,
            classroomName,
          };
        })
      );

      const issuesData = await Promise.all(issuePromises);
      setIssues(issuesData);
      setLoading(false);
    }

    getIssues();
  }, []);

  const resolvedissues = issues.filter((issue) => issue.isResolved);
  const unresolvedissues = issues.filter((issue) => !issue.isResolved);

  if (loading) {
    return <Loader text={"Loading Issues..."} />;
  }

  return (
    <>
      <div className="flex min-h-screen bg-gray-100">
        <div className="flex-1 w-full m-5 bg-white rounded">
          <div className="flex-1 p-8">
            <div className="flex items-center justify-between mb-6">
              <h1 className="mb-2 text-2xl font-bold">Your Issues</h1>
            </div>

            {unresolvedissues.length > 0 && (
              <div>
                <h2 className="mb-4 text-xl font-bold">Unresolved Issues</h2>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {unresolvedissues.map((issue) => (
                    <Card
                      key={issue._id}
                      className="w-full max-w-md transition-shadow duration-200 bg-white hover-card"
                    >
                      <CardContent>
                        <Box className="flex items-start justify-between mb-3">
                          <Box className="flex items-center space-x-2">
                            <SchoolIcon className="text-gray-500" />
                            <Typography
                              variant="subtitle2"
                              className="text-gray-600"
                            >
                              {issue.classroomName}
                            </Typography>
                          </Box>
                        </Box>
                        <Typography variant="h6" className="mb-2 font-semibold">
                          {issue.description}
                        </Typography>
                        <Typography
                          variant="body2"
                          className="mb-4 text-gray-600"
                        >
                          {issue.severity}
                        </Typography>
                        <Box className="flex items-center justify-between mt-2">
                          <Box className="flex items-center space-x-2">
                            <WarningIcon
                              className={
                                issue.isResolved
                                  ? "text-green-500"
                                  : "text-yellow-500"
                              }
                            />
                            <Typography
                              variant="body2"
                              className={
                                issue.isResolved
                                  ? "text-green-600"
                                  : "text-yellow-600"
                              }
                            >
                              {issue.isResolved ? "Done" : "Pending"}
                            </Typography>
                          </Box>
                          <Typography
                            variant="caption"
                            className="text-gray-500"
                          >
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
              <div className="mt-6">
                <h2 className="mb-4 text-xl font-bold">Resolved Issues</h2>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {resolvedissues.map((issue) => (
                    <Card
                      key={issue._id}
                      className="w-full max-w-md transition-shadow duration-200 bg-white hover-card"
                    >
                      <CardContent>
                        <Box className="flex items-start justify-between mb-3">
                          <Box className="flex items-center space-x-2">
                            <SchoolIcon className="text-gray-500" />
                            <Typography
                              variant="subtitle2"
                              className="text-gray-600"
                            >
                              {issue.classroomName}
                            </Typography>
                          </Box>
                        </Box>
                        <Typography variant="h6" className="mb-2 font-semibold">
                          {issue.description}
                        </Typography>
                        <Typography
                          variant="body2"
                          className="mb-4 text-gray-600"
                        >
                          {issue.severity}
                        </Typography>
                        <Box className="flex items-center justify-between mt-2">
                          <Box className="flex items-center space-x-2">
                            <WarningIcon
                              className={
                                issue.isResolved
                                  ? "text-green-500"
                                  : "text-yellow-500"
                              }
                            />
                            <Typography
                              variant="body2"
                              className={
                                issue.isResolved
                                  ? "text-green-600"
                                  : "text-yellow-600"
                              }
                            >
                              {issue.isResolved ? "Done" : "Pending"}
                            </Typography>
                          </Box>
                          <Typography
                            variant="caption"
                            className="text-gray-500"
                          >
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
      </div>
    </>
  );
};

export default Issuessection;
