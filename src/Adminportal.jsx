import React, { useState } from 'react';
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

const AdminPortal = () => {
  const [AdminEmail, setAdminEmail] = useState('');
  const [AdminPassword, setAdminPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Admin email and password are : ", AdminEmail, AdminPassword);

    // So now we send the request to login the admin using axios.

    
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

export default AdminPortal;