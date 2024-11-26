import React, { useState } from 'react';
import { useAuth } from '../../../context/auth';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Link,
  Container,
  FormHelperText
} from '@mui/material';
import axios from 'axios';

const AdminLoginpage = () => {
  const [AdminEmail, setAdminEmail] = useState('');
  const [AdminPassword, setAdminPassword] = useState('');
const [auth , setAuth] = useAuth();
  const handleSubmit = async(event) => {
    event.preventDefault();
    console.log("Admin email and password are : ", AdminEmail, AdminPassword);

    // So now we send the request to login the admin using axios.
    try {
      const res = await axios.post("http://localhost:3000/admin/login", {
  email: AdminEmail,
  password: AdminPassword
});

setAuth({
  ...auth,
  email:'helo',
  token:'njdjskfh'
  // email: res.data.admin.email || 'none', // Fallback to an empty string if undefined
  // token: res.data.jwt_token || 'none',   // Fallback to an empty string if undefined
});

console.log("auth Data is  :  "+ auth);





console.log(res.data.jwt_token +" " + res.data.admin.email);
      
    } catch (error) {
      console.log('error in login',error);
      
      
    }

    
  
    
  //   if (res && res.data.success) {
  // alert(res.data.message); // Ensure "message" is part of the response data
  // setAuth({
  //   ...auth,
  //   user: res.data.email, // Ensure "user" is present in the response structure
  //   token: res.data.jwt_token, // Include token if it exists
  // });
// } else {
//   alert(res.data.message || "Login failed");
// }

    
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
                type='email'
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
                type='password'
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