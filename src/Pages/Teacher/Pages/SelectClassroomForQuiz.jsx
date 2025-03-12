import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  InputAdornment,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import TeacherLoader from "../Components/TeacherLoader";
import { ICONS } from "../Icons/icons";

const SelectClassroomForQuiz = () => {
  const [classrooms, setClassrooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const savedAuth = JSON.parse(localStorage.getItem("auth"));
  const navigate = useNavigate();

  useEffect(() => {
    async function getClassrooms() {
      const res = await axios.get(
        `http://localhost:3000/teacher/${savedAuth.id}/classrooms`
      );
      setClassrooms(res.data.classrooms);
      setLoading(false);
    }

    getClassrooms();
  }, [savedAuth.id]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredClassrooms = classrooms.filter((classroom) =>
    classroom.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <TeacherLoader text="Loading Classrooms..." />;
  }

  return (
    <main>
      <div className="bg-white">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 mb-6 border-b border-btn">
          <div className="flex items-center gap-2 text-text">
            <span>
              <ICONS.CLASSROOMS size={30} />
            </span>
            <h1 className="text-2xl font-semibold ">Your Classrooms</h1>
          </div>
        </div>

        <TextField
          label="Search Classrooms"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <ICONS.SEARCH />
              </InputAdornment>
            ),
          }}
          sx={{ marginBottom: 4 }}
        />
        <p className="flex w-full gap-2 mb-6 text-base text-center text-text md:text-lg">
          <ICONS.QUIZ size={30} />
          <span>Select a classroom to Generate Quiz</span>
        </p>
        {/* Classrooms */}

        {filteredClassrooms && filteredClassrooms.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 px-4 md:grid-cols-2 lg:grid-cols-3 md:px-8">
            {filteredClassrooms.map((classroom) => {
              return (
                <Card
                  key={classroom._id}
                  onClick={() =>
                    navigate(
                      `/teacher/classroom/${classroom._id}/generate-quiz`
                    )
                  }
                  className="relative transition-all duration-300 transform cursor-pointer hover:scale-105 hover:shadow-2xl"
                  sx={{
                    background:
                      "linear-gradient(135deg, #E0F7FA 0%, #E1F5FE 100%)",
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
                  <CardContent className="relative flex flex-col items-center justify-center h-full">
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
              );
            })}
          </div>
        ) : (
          <div className="mt-8 text-center">
            <p className="text-text">No classrooms found available.</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default SelectClassroomForQuiz;
