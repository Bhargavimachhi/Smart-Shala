import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TeacherLeftSideNavBar from "../Components/TeacherLeftSideNavBar";
import Loader from "@/Pages/InitialPages/Loader";
import { ICONS } from "../Icons/icons";
import { Button, Card, CardContent, Typography } from "@mui/material";
import TeacherLoader from "../Components/TeacherLoader";

const ViewClassrooms = () => {
  const [classrooms, setClassrooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  const savedAuth = JSON.parse(localStorage.getItem("auth"));

  const toggleSidebar = () => {
    setIsExpanded((prevState) => !prevState);
  };

  useEffect(() => {
    async function fetchClassrooms() {
      try {
        const res = await axios.get(
          `http://localhost:3000/teacher/${savedAuth.id}/classrooms`
        );
        setClassrooms(res.data.classrooms);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching classrooms:", error);
        setLoading(false);
      }
    }
    fetchClassrooms();
  }, [savedAuth.id]);

  if (loading) {
    return <TeacherLoader text="Loading Classrooms..." />;
  }

  return (
    <main>
      <div className="bg-white">
        {/* Header */}
        <div className="flex flex-col items-start justify-start gap-4 pb-2 mb-6 border-b border-btn md:flex-row md:gap-0 md:justify-between md:items-center">
          <div className="flex items-center gap-2 text-text">
            <span>
              <ICONS.CHECK_HOMEWORK size={30} />
            </span>
            <h1 className="font-semibold md:text-2xl ">
              Check Homework of Classrooms
            </h1>
          </div>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            onClick={() => {
              navigate("/teacher/add-homework/form");
            }}
          >
            Add Homework +
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6 px-4 md:grid-cols-2 lg:grid-cols-3 md:px-8">
          {classrooms.map((classroom) => (
            <Card
              key={classroom._id}
              onClick={() =>
                navigate(
                  `/teacher/classroom/${classroom._id}/submitted-homeworks`
                )
              }
              className="relative transition-all duration-300 transform cursor-pointer hover:scale-105 hover:shadow-xl"
              sx={{
                background: "linear-gradient(135deg, #E0F7FA 0%, #E1F5FE 100%)",
                borderRadius: 3,
                boxShadow: 3,
                height: 200,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                textAlign: "center",
                position: "relative",
              }}
            >
              {/* <h2 className="mb-2 text-xl font-semibold">{classroom.name}</h2> */}
              {/* <p className="text-gray-600">{classroom.description}</p> */}
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{
                    color: "#0288d1",
                    fontWeight: "bold",
                    mb: 2,
                    textTransform: "capitalize",
                  }}
                >
                  {classroom.name}
                </Typography>
                <div className="flex items-center justify-center gap-2 mb-1">
                  <ICONS.STUDENT sx={{ color: "#00796b" }} />
                  <Typography variant="body2" sx={{ color: "#004d40" }}>
                    {classroom.students.length} Students
                  </Typography>
                </div>

                <div className="flex items-center justify-center gap-2">
                  <ICONS.TEACHER sx={{ color: "#f57c00" }} />
                  <Typography variant="body2" sx={{ color: "#e65100" }}>
                    {classroom.teachers.length} Teachers
                  </Typography>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
};

export default ViewClassrooms;
