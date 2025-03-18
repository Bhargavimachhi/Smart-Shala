import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Button,
  TextField,
  InputAdornment,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { useState, useEffect } from "react";
import axios from "axios";
import { MoreVertical } from "lucide-react";
import "../../../components/hover.css";
import Loader from "../../InitialPages/Loader";

const ClassroomListingpage = () => {
  const [classrooms, setClassrooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const savedAuth = JSON.parse(localStorage.getItem("auth"));

  useEffect(() => {
    async function getClassrooms() {
      const res = await axios.get(
        `http://localhost:3000/admin/${savedAuth.id}/classrooms`
      );
      console.log(res.data.classrooms);
      setClassrooms(res.data.classrooms);
      setLoading(false);
    }

    getClassrooms();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredClassrooms = classrooms.filter((classroom) =>
    classroom.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <Loader text={"Loading Classrooms..."} />;
  }

  return (
    <>
      <div className="flex min-h-screen bg-gray-100">
        <div className="flex-1 w-full m-5 bg-white rounded">
          <div className="flex-1 p-8">
            <div className="flex items-center justify-between mb-6">
              <h1 className="mb-2 text-2xl font-bold">Your Classrooms</h1>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{ marginTop: 2 }}
                onClick={() => navigate("/admin/create-classroom")}
              >
                Create Classroom
              </Button>
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
                    <Search />
                  </InputAdornment>
                ),
              }}
              sx={{ marginBottom: 4 }}
            />

            {filteredClassrooms && filteredClassrooms.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredClassrooms.map((classroom) => {
                  return (
                    <Card
                      className="relative h-48 mb-8 cursor-pointer hover-card"
                      key={classroom._id}
                      onClick={() =>
                        navigate(`/admin/classrooms/${classroom._id}`)
                      }
                      style={{ cursor: "pointer" }}
                    >
                      <CardContent className="relative flex flex-col items-center justify-center h-full">
                        <Typography
                          variant="h5"
                          className="font-bold text-center text-blue-600"
                        >
                          {classroom.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          className="mt-2 text-center text-gray-600"
                        >
                          {classroom.students.length} Students
                        </Typography>
                        <Typography
                          variant="body2"
                          className="text-center text-gray-600"
                        >
                          {classroom.teachers.length} Teachers
                        </Typography>
                      </CardContent>
                      <div className="absolute top-2 right-2">
                        <IconButton
                          onClick={(e) => {
                            e.stopPropagation(); /* Add edit/delete functionality here */
                          }}
                        >
                          <MoreVertical />
                        </IconButton>
                      </div>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <div className="mt-8 text-center">
                <p className="text-gray-500">No classrooms found available.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ClassroomListingpage;
