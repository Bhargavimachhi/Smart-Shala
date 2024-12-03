import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Link,
  Container,
  FormHelperText,
} from "@mui/material";
import toast from "react-hot-toast";

const StudentLogin = () => {
  const [auth, setAuth] = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Handle Student Login Submission
  const HandleStudentSubmit = async (e) => {
    e.preventDefault(); // Prevent form from refreshing the page

    try {
      // Make POST request to login endpoint
      const res = await axios.post("http://localhost:3000/login/student", {
        email,
        password,
      });

      console.log("Login successful:", res.data);

      // Update the studentAuth state with the response data
      setAuth({
        id: res.data.student._id,
        token: res.data.jwt_token_student,
        role: "student",
      });
      window.location.href = window.location.origin+"/student";
    } catch (error) {
      console.error("Error during student login:", error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <Container component="main" maxWidth="sm" className="mt-24">
      <Card elevation={3} className="p-6 sm:p-10">
        <CardContent>
          <Typography variant="h4" component="h1" align="center" gutterBottom>
            SMART SHALA STUDENT LOGIN
          </Typography>

          <div role="tabofadmin">
            <Box component="form" sx={{ mt: 1 }} onSubmit={HandleStudentSubmit}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email-admin"
                label="Enter your Student Email"
                name="email"
                autoComplete="email"
                autoFocus
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                variant="outlined"
                value={email}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Enter your password"
                type="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
                variant="outlined"
                value={password}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{ mt: 2, mb: 2 }}
              >
                Login as Student
              </Button>
              <FormHelperText className="flex justify-center">
                Don't have an account?{" "}
                <Link href="#" underline="hover">
                  Sign Up
                </Link>
              </FormHelperText>
            </Box>
          </div>
        </CardContent>
      </Card>
    </Container>
    </>
  );
};

export default StudentLogin;
