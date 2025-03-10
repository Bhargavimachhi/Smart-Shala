import { Box, Button, Container, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

const AddSchool = () => {
  const [email, setEmail] = useState("");
  const savedAuth = JSON.parse(localStorage.getItem("auth"));

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (email === "") {
      toast.error("Email is required");
      return;
    }

    try {
      const response = await axios.post(
        //temporary pass id
        `http://localhost:3000/authority/67cac400ca7c42a22aa73f4c/add-school`,
        {
          email: email,
        }
      );
      toast.success("School added successfully");
      setEmail("");
    } catch (error) {
      console.error("Error generating issue:", error);
      toast.error(error.response.data.message);
    }
    // Add your form submission logic here
  };

  return (
    <Container className="p-4">
      <Box component="form" className="form-container">
        <Typography
          variant="h4"
          gutterBottom
          className="!mb-6 border-b border-btn !font-semibold text-text !text-2xl"
        >
          Add School
        </Typography>

        {/* School Name */}
        <TextField
          label="Add Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
  );
};

export default AddSchool;
