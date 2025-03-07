import React, { useState, useEffect } from "react";
import SideNavbar from "../../../components/SideNavbar";
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
  Button,
} from "@mui/material";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SCHOOLS = [
  {
    _id: "1",
    name: "Greenwood International School",
    email: "greenwood@gmail.com",
    contact: "9876543210",
    address: "123 Elm Street, Springfield",
  },
  {
    _id: "2",
    name: "Sunrise Public School",
    email: "sunriseps@gmail.com",
    contact: "8765432109",
    address: "45 Oak Avenue, Metropolis",
  },
  {
    _id: "3",
    name: "St. Xavier's High School",
    email: "stxaviers@gmail.com",
    contact: "7654321098",
    address: "678 Pine Road, Gotham City",
  },
  {
    _id: "4",
    name: "Bright Future Academy",
    email: "brightfuture@gmail.com",
    contact: "6543210987",
    address: "89 Maple Lane, Star City",
  },
  {
    _id: "5",
    name: "Heritage Global School",
    email: "heritage@gmail.com",
    contact: "5432109876",
    address: "321 Cedar Street, Central City",
  },
  {
    _id: "6",
    name: "Oakridge Academy",
    email: "oakridge@gmail.com",
    contact: "4321098765",
    address: "987 Willow Drive, Riverdale",
  },
];

const SchoolListingPage = () => {
  const [schools, setSchools] = useState(SCHOOLS);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("name");
  const savedAuth = JSON.parse(localStorage.getItem("auth"));
  const navigate = useNavigate();

  // Thiss useEffect hookk willl try to preload the data from the server before rendering the screen.
  //   useEffect(() => {
  //     const getSchools = async () => {
  //       const res = await axios.get(``);

  //     //   setSchools("");
  //       setLoading(false);
  //     };
  //     getSchools();
  //   }, []);

  if (loading) {
    return <div className="mt-8 text-center">Loading Schools...</div>;
  }

  const filteredSchools = schools
    .filter((school) =>
      school[sortOption].toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      return a[sortOption].localeCompare(b[sortOption]);
    });

  return (
    <>
      <div className="flex min-h-screen bg-gray-200">
        <SideNavbar />
        <div className="flex-1 w-screen p-8 m-5 bg-white rounded">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Schools</h1>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ marginTop: 2 }}
              onClick={() => navigate("/admin/add-school")}
            >
              Add School
            </Button>
          </div>

          {/* end of form to add Student */}

          {schools && schools.length > 0 ? (
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
                    <MenuItem value="contact">Contact</MenuItem>
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
                        {school.contact && (
                          <Typography color="textSecondary">
                            Contact: {school.contact}
                          </Typography>
                        )}

                        {school.address && (
                          <Typography color="textSecondary">
                            Address: {school.address}
                          </Typography>
                        )}
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </>
          ) : (
            <div className="mt-8 text-center">No School found</div>
          )}
        </div>
      </div>
    </>
  );
};

export default SchoolListingPage;
