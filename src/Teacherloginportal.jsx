import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Tabs,
  Tab,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Link,
  Container,
  FormHelperText
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Person, School } from '@mui/icons-material';
import axios from "axios";



const LoginPage = () => {
  const [tabValue, setTabValue] = useState(0);
  
  // Aae states che for email and password

  const [StudentEmail, setStudentEmail] = useState('');
  const [TeacherEmail, setTeacherEmail] = useState('');
  const [StudentPassword, setStudentPassword] = useState('');
  const [TeacherPassword, setTeacherPassword] = useState('');


  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleChange = (event) => {
    const { name, value, checked } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rememberMe' ? checked : value
    }));
  };

  const handleSubmit = (type) => (res) => {
    res.preventDefault();

    if(type == 0){
      // Aae student mate request login
      console.log("This is a student", StudentEmail,StudentPassword);

      // We send the request accoding to type 

      //Atle aie apde axios request karsu for student login

      const res = axios.post("");

    
    }

    else{
      // Aae teacher mate request login
      console.log("This is a Teacher",TeacherEmail,TeacherPassword);


      // We send the request accoding to type 

      //Atle aie apde axios request karsu for teacher login


      const res = axios.post("");
    }



    
    
  };

  return (
    <Container component="main" maxWidth="sm" className="mt-24">
      <Card elevation={3} className="p-4 sm:p-8">
        <CardContent>
          <Typography variant="h4" component="h1" align="center" gutterBottom>
            SMART SHALA LOGIN
          </Typography>

          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="fullWidth"
            indicatorColor="primary"
            textColor="primary"
            aria-label="login tabs"
          >
            <Tab
              icon={<School />}
              label="Student"
              iconPosition="start"
            />
            <Tab
              icon={<Person />}
              label="Teacher"
              iconPosition="start"
            />
          </Tabs>

          <div role="tabofstudent" hidden={tabValue !== 0}>
            {tabValue === 0 && (
              <Box component="form" sx={{ mt: 1 }} onSubmit={handleSubmit(0)}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email-student"
                  label="Enter your Student Email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  type='email'
                  onChange={(e) => setStudentEmail(e.target.value)}
                  variant="outlined"
                  value={StudentEmail}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  type='password'
                  label="Enter your password"
                  autoComplete="password"
                  onChange={(e) => setStudentPassword(e.target.value)}
                  variant="outlined"
                  value={StudentPassword}
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
                <FormHelperText align="center" className="flex justify-center">
                  Don't have an account?{" "}
                  <Link href="#" underline="hover">
                    Sign Up
                  </Link>
                </FormHelperText>
              </Box>
            )}


          </div>

          

          <div role="tabofteacher" hidden={tabValue !== 1}>
            {tabValue === 1 && (
              <Box component="form" sx={{ mt: 1 }} onSubmit={handleSubmit(1)}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email-teacher"
                  label="Enter your Teacher Email"
                  name="email"
                  type='email'
                  autoComplete="email"
                  autoFocus
                  onChange={(e) => setTeacherEmail(e.target.value)}
                  variant="outlined"
                  value={TeacherEmail}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  type='password'
                  label="Enter your password"
                  autoComplete="password"
                  onChange={(e) => setTeacherPassword(e.target.value)}
                  variant="outlined"
                  value={TeacherPassword}
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
                <FormHelperText align="center" className="flex justify-center">
                  Don't have an account?{" "}
                  <Link href="#" underline="hover">
                    Sign Up
                  </Link>
                </FormHelperText>
              </Box>
            )}
          </div>


        </CardContent>
      </Card>
    </Container>
  );
};

export default LoginPage;