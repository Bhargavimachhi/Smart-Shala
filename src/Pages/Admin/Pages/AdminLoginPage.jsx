import { useState, useEffect } from "react";
import { useAuth } from "../../../context/auth";
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
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminLoginpage = () => {
  const [AdminEmail, setAdminEmail] = useState("");
  const [AdminPassword, setAdminPassword] = useState("");
  const [role , setRole] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  // Log `auth` when it updates
  useEffect(() => {
    console.log("auth updated:", auth);
  }, [auth]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Admin email and password are: ", AdminEmail, AdminPassword,role);

    try {
      // Send login request to the server
      const res = await axios.post("http://localhost:3000/admin/login", {
        email: AdminEmail,
        password: AdminPassword,
        role:role
      });

      // Update `auth` state with the response data
      setAuth({
        ...auth,
        email: res.data.admin.email,
        token: res.data.jwt_token,
        role:res.data.admin.role
      });

      console.log("Login successful!");
      navigate("/admin");
    } catch (error) {
      console.error("Error in login:", error);
    }
  };

  return (
    <Container component="main" maxWidth="sm" className="mt-24">
      <Card elevation={3} className="p-6 sm:p-10">
        <CardContent>
          <Typography variant="h4" component="h1" align="center" gutterBottom>
            SMART SHALA ADMIN LOGIN
          </Typography>

          <div role="tabofadmin">
            <Box component="form" sx={{ mt: 1 }} onSubmit={handleSubmit}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email-admin"
                label="Enter your Admin Email"
                name="email"
                autoComplete="email"
                autoFocus
                type="email"
                onChange={(e) => setAdminEmail(e.target.value)}
                variant="outlined"
                value={AdminEmail}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Enter your password"
                type="password"
                autoComplete="current-password"
                onChange={(e) => setAdminPassword(e.target.value)}
                variant="outlined"
                value={AdminPassword}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{ mt: 2, mb: 2 }}
              >
                Login as Admin
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
  );
};

export default AdminLoginpage;
