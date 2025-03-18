import { useState } from "react";
import axios from "axios";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  FormHelperText,
  Link,
} from "@mui/material";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AuthoritySignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setloading] = useState(false);
  const navigate = useNavigate();

  const HandleTeacherSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      toast.error("Password must be atleast 6 charcater long");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3000/signup/authority", {
        email,
        password,
      });
      if (res.status === 200) {
        toast.success("User added successfully");
        navigate("/login/authority");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (loading) {
    toast.loading("Loading...Please wait");
  }

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Paper elevation={3} sx={{ padding: 4, marginTop: 25 }}>
          <Typography component="h1" variant="h5" align="center" gutterBottom>
            Authority Signup
          </Typography>
          <Box component="form" onSubmit={HandleTeacherSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              type="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          </Box>
          <FormHelperText className="flex justify-center">
            Already have an account?{" "}
            <Link href="/login/authority" underline="hover">
              Log In
            </Link>
          </FormHelperText>
        </Paper>
      </Container>
    </>
  );
};

export default AuthoritySignupPage;
