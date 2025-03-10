import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  Container,
  Drawer,
  IconButton,
  Chip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SideNavbar from "../../../../components/SideNavbar";
import toast from "react-hot-toast";
import axios from "axios";

const AddSchool = () => {
  const [schoolName, setSchoolName] = useState("");
  const savedAuth = JSON.parse(localStorage.getItem("auth"));

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (schoolName === "") {
      toast.error("School Name is required");
      return;
    }
    try {
      const response = await axios.post(
        `http://localhost:3000/authority/${savedAuth.id}/add-school`,
        {
          email: "admin11@gmail.com",
        }
      );
      toast.success("School added successfully");
    } catch (error) {
      console.error("Error generating issue:", error);
      toast.error(error.response.data.message);
    }
    // Add your form submission logic here
  };

  return (
    <Box display="flex" className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <SideNavbar />

      {/* Main content */}
      <Container maxWidth="sm" className="p-4">
        <Box
          component="form"
          className="form-container"
          sx={{ display: "flex", flexDirection: "column", gap: 3 }}
        >
          <Typography variant="h4" gutterBottom>
            Add School
          </Typography>

          {/* School Name */}
          <TextField
            label="School Name"
            variant="outlined"
            value={schoolName}
            onChange={(e) => setSchoolName(e.target.value)}
            fullWidth
            required
          />

          {/* Submit Button */}
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ marginTop: 2 }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default AddSchool;
