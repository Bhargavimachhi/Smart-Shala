import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  Button,
} from "@mui/material";
import { ICONS } from "../Icons/icons";
import axios from "axios";
import SuperAdminLoader from "../Components/SuperAdminLoader";

const Schools = () => {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("name");
  const savedAuth = JSON.parse(localStorage.getItem("auth"));
  const navigate = useNavigate();

  // Thiss useEffect hookk willl try to preload the data from the server before rendering the screen.
  useEffect(() => {
    const getSchools = async () => {
      //temporary pass id
      const res = await axios.get(
        `http://localhost:3000/authority/67cac400ca7c42a22aa73f4c/schools`
      );

      setSchools(res.data.schools);
      setLoading(false);
    };
    getSchools();
  }, []);

  const filteredSchools = schools
    .filter((school) =>
      school[sortOption].toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      return a[sortOption].localeCompare(b[sortOption]);
    });

  if (loading) {
    return <SuperAdminLoader text={"Loading Schools..."} />;
  }

  return (
    <>
      <div className="">
        <div className="bg-white">
          <div className="flex items-center justify-between pb-3 mb-6 border-b border-btn">
            <div className="flex items-center gap-2 text-text">
              <span>
                <ICONS.SCHOOLS size={30} />
              </span>
              <h1 className="text-2xl font-semibold ">Schools</h1>
            </div>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              onClick={() => navigate("/authority/schools/add-school")}
            >
              Add School
            </Button>
          </div>

          {/* end of form to add Student */}

          {schools && schools.length > 0 ? (
            <>
              <div className="flex gap-5 mb-5">
                {/* Search bar */}
                <TextField
                  label="Search School here"
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
                  </Select>
                </FormControl>
              </div>

              <Grid container spacing={3}>
                {filteredSchools.map((school) => (
                  <Grid item xs={12} sm={6} md={4} key={school._id}>
                    <Card elevation={3}>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          {school.name}
                        </Typography>
                        {school.email && (
                          <Typography color="textSecondary">
                            Email: {school.email}
                          </Typography>
                        )}
                        {/* {school.contact && (
                          <Typography color="textSecondary">
                            Contact: {school.contact}
                          </Typography>
                        )} */}

                        {/* {school.address && (
                          <Typography color="textSecondary">
                            Address: {school.address}
                          </Typography>
                        )} */}
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </>
          ) : (
            <SuperAdminLoader text={"Loading Schools..."} />
          )}
        </div>
      </div>
    </>
  );
};

export default Schools;
