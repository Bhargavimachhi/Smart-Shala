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

const TeacherLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const HandleTeacherSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make the API request
      const res = await axios.post("http://localhost:3000/login/teacher", {
        email,
        password,
      });

      // Update teacherAuth state with response data
      setAuth({
        id: res.data.teacher._id,
        token: res.data.jwt_token_teacher,
        role: "teacher",
      });
      window.location.href = window.location.origin+"/teacher";
      navigate("/teacher");
    } catch (error) {
      console.error(
        "Error during teacher login:",
        error.response?.data || error.message
      );
      alert(error.response.data.message);
    }
  };

  return (
    <>
      <Container component="main" maxWidth="sm" className="mt-24">
      <Card elevation={3} className="p-6 sm:p-10">
        <CardContent>
          <Typography variant="h4" component="h1" align="center" gutterBottom>
            SMART SHALA TEACHER LOGIN
          </Typography>

          <div role="tabofadmin">
            <Box component="form" sx={{ mt: 1 }} onSubmit={HandleTeacherSubmit}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email-admin"
                label="Enter your Teacher Email"
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
                Login as Teacher
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

export default TeacherLogin;
