import { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import Loader from "../../InitialPages/Loader";
import { useNavigate } from "react-router-dom";

const StudentListingpage = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("name");
  const savedAuth = JSON.parse(localStorage.getItem("auth"));
  const navigate = useNavigate();

  // Thiss useEffect hookk willl try to preload the data from the server before rendering the screen.
  useEffect(() => {
    async function fetchStudents() {
      const res = await axios.get(
        `http://localhost:3000/admin/${savedAuth.id}/students`
      );

      console.log(res.data.students);
      setStudents(res.data.students);
      setLoading(false);
    }
    fetchStudents();
  }, []);

  if (loading) {
    return <Loader text={"Loading Students..."} />;
  }

  const filteredStudents = students
    .filter((student) =>
      student[sortOption].toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      return a[sortOption].localeCompare(b[sortOption]);
    });

  return (
    <>
      <div className="flex min-h-screen bg-gray-200 w-full">
        <div className="flex-1 w-full p-8 m-5 bg-white rounded">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Students</h1>
          </div>

          {/* end of form to add Student */}

          {students && students.length > 0 ? (
            <>
              <div className="flex gap-5 mb-10">
                {/* Search bar */}
                <TextField
                  label="Search here"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />

                {/* Sorting dropdown */}
                <FormControl fullWidth margin="normal">
                  <InputLabel id="sort-label" className="-mt-5">
                    Sort By
                  </InputLabel>
                  <Select
                    labelId="sort-label"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                  >
                    <MenuItem value="name">Name</MenuItem>
                    <MenuItem value="email">Email</MenuItem>
                    <MenuItem value="email">Parent Name</MenuItem>
                  </Select>
                </FormControl>
              </div>

              <Grid container spacing={3}>
                {filteredStudents.map((student) => (
                  <Grid item xs={12} sm={6} md={4} key={student._id} onClick={() => {
                    navigate(`/profile/student/${student._id}`);
                  }}>
                    <Card elevation={3} className="cursor-pointer hover-card">
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          {student.name}
                        </Typography>
                        {student.email && (
                          <Typography color="textSecondary">
                            Email: {student.email}
                          </Typography>
                        )}
                        {student.contact && (
                          <Typography color="textSecondary">
                            Contact: {student.contact}
                          </Typography>
                        )}
                        {student.parentName && (
                          <Typography color="textSecondary">
                            Parent Name: {student.parentName}
                          </Typography>
                        )}
                        {student.parentContact && (
                          <Typography color="textSecondary">
                            Parent Contact: {student.parentContact}
                          </Typography>
                        )}
                        {student.address && (
                          <Typography color="textSecondary">
                            Address: {student.address}
                          </Typography>
                        )}
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </>
          ) : (
            <div className="mt-8 text-center">No student found</div>
          )}
        </div>
      </div>
    </>
  );
};

export default StudentListingpage;
