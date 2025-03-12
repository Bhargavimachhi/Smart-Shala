import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Box,
  Button,
} from "@mui/material";
import { ICONS } from "../Icons/icons";
import TeacherLoader from "../Components/TeacherLoader";

const ClassroomStudents = () => {
  const { classroomId } = useParams();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchCategory, setSearchCategory] = useState("name");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/classroom/${classroomId}/students`
        );
        setStudents(res.data.students);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching students:", error);
        setLoading(false);
      }
    };

    fetchStudents();
  }, [classroomId]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredStudents = students.filter((student) => {
    const value = student[searchCategory]
      ? student[searchCategory].toString().toLowerCase()
      : "";
    return value.includes(searchTerm.toLowerCase());
  });

  if (loading) {
    return <TeacherLoader text="Loading Students.." />;
  }

  return (
    <main>
      <div className="bg-white">
        <div className="flex items-center justify-between pb-3 mb-6 border-b border-btn">
          <div className="flex items-center gap-2 text-text">
            <span>
              <ICONS.STUDENT size={30} />
            </span>
            <h1 className="text-2xl font-semibold ">Classrooms Students</h1>
          </div>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            onClick={() => navigate(-1)}
          >
            <span>
              <ICONS.BACK size={20} />
            </span>
            <span>Back</span>
          </Button>
        </div>

        <Box mb={4} mt={3}>
          <div className="flex items-center justify-between">
            <FormControl variant="outlined" sx={{ minWidth: 120 }}>
              <InputLabel id="search-category-label">Search By</InputLabel>
              <Select
                labelId="search-category-label"
                value={searchCategory}
                onChange={(e) => setSearchCategory(e.target.value)}
                label="Search By"
              >
                <MenuItem value="name">Name</MenuItem>
                <MenuItem value="email">Email</MenuItem>
                <MenuItem value="contact">Contact</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Search Students"
              variant="outlined"
              value={searchTerm}
              onChange={handleSearch}
              sx={{ marginLeft: 2, flex: 1 }}
            />
          </div>
        </Box>
        {filteredStudents.length > 0 ? (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Contact</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student._id}>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell>{student.contact}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          navigate(`/profile/student/${student._id}`);
                        }}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <div className="mt-8 text-center">
            <Typography variant="body1" color="textSecondary">
              No students in this classroom.
            </Typography>
          </div>
        )}
      </div>
    </main>
  );
};

export default ClassroomStudents;
