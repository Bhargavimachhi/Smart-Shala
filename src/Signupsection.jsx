import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {

  FormControlLabel,
  RadioGroup,
  Radio,
  TextField,
 
  Container,
  Card,
  CardContent
} from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast,Toaster } from 'react-hot-toast';
const steps = ['Select your Type', 'Fill out the details', 'Review your data'];

const SignupFunction = () => {
  const [activeStep, setActiveStep] = new useState(0);
  const [role, setRole] = useState('');
  const [studentDetails, setStudentDetails] = useState({ name: '', email: '', password: '',rollno:"" });
  const [teacherDetails, setTeacherDetails] = useState({ name: '', email: '' , password: ''});
  const navigate = useNavigate();
  const isStepOptional = (step) => {
    return step === 1;
  };

 
  const handleNext = () => {
    

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
   
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  


  const handleReset = () => {
    setActiveStep(0);
    setRole('');
    setStudentDetails({ name: '', email: '', rollno: '' });
    setTeacherDetails({ name: '', email: '',password:'' });
  };


  const handleSubmit = async () => {
    try {
      if (role === 'student') {

        console.log("Student details are : ", studentDetails);
        // Sooo here will be our axios signup request to student
        toast.loading("Signing you up ...");

        const res = await axios.post("http://localhost:3000/signupstudent", studentDetails);

       

        // So yea checking for the right message

        if(res.data.message === "New Student Added Successfully"){



          // little notification would be nice
          toast.success('New Student Added Successfully');

          navigate('/students'); 
        }
        
      } else if (role === 'teacher') {
        console.log("Teacher details are : ", teacherDetails);
        toast.loading("Signing you up ...");


        // Sooo here will be our axios signup request to teacher

        const res = await axios.post("http://localhost:3000/signupteacher", teacherDetails);

        // So yea checking for the right message

        if(res.data.message === "New Teacher Added Successfully"){

          // little notification would be nice
          toast.success('New Teacher Added Successfully');

          navigate('/Teachers'); 
      }
      handleReset();
    }
   } catch (error) {
      console.error('There was an error submitting the form!', error);
      alert('Signup failed. Please try again.');
    }
  };

  const handleStudentDetailsChange = (event) => {
    const { name, value } = event.target;
    setStudentDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleTeacherDetailsChange = (event) => {
    const { name, value } = event.target;
    setTeacherDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  return (

    <Container component="main" maxWidth="md" className="mt-24">
      <Toaster />

    <Card elevation={3} className="p-6 sm:p-10">
    <Typography variant="h4" component="h1" align="center" gutterBottom>
            SMART SHALA SIGNUP
          </Typography>
      <CardContent>
        <Box sx={{ width: '100%' }}>
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};
             
              
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {activeStep === steps.length ? (
             <>
             
             </>
            ) : (
              <React.Fragment>
             
              <Box sx={{ display: 'flex', flexDirection: 'column', pt: 2 }}>
                {activeStep === 0 && (
                  <RadioGroup value={role} onChange={handleRoleChange}>
                    <FormControlLabel value="student" control={<Radio />} label="Student" />
                    <FormControlLabel value="teacher" control={<Radio />} label="Teacher" />
                  </RadioGroup>
                )}
                 {activeStep === 1 && role === 'student' && (
                    <Box>
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="student-name"
                        label="Student Name"
                        name="name"
                        autoComplete="name"
                        autoFocus
                        onChange={handleStudentDetailsChange}
                        value={studentDetails.name}
                      />
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="student-email"
                        label="Student Email"
                        name="email"
                        type='email'
                        autoComplete="email"
                        onChange={handleStudentDetailsChange}
                        value={studentDetails.email}
                      />
                        <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="student-password"
                        label="Student password"
                        name="password"
                        type='password'
                        autoComplete="password"
                        onChange={handleStudentDetailsChange}
                        value={studentDetails.password}
                      />
                        <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="student-rollno"
                        label="Student rollno"
                        name="rollno"
                        autoComplete="rollno"
                        onChange={handleStudentDetailsChange}
                        value={studentDetails.rollno}
                      />
                    </Box>
            )}
              {activeStep === 1 && role === 'teacher' && (
                    <Box>
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="teacher-name"
                        label="Teacher Name"
                        name="name"
                        autoComplete="name"
                        autoFocus
                        onChange={handleTeacherDetailsChange}
                        value={teacherDetails.name}
                      />
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="teacher-email"
                        label="Teacher Email"
                        name="email"
                        type='email'
                        autoComplete="email"
                        onChange={handleTeacherDetailsChange}
                        value={teacherDetails.email}
                      />
                       <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="teacher-password"
                        label="Teacher password"
                        name="password"
                        type='password'
                        autoComplete="password"
                        onChange={handleTeacherDetailsChange}
                        value={teacherDetails.password}
                      />
                    </Box>
                  )}
                   {activeStep === 2 && (
                    <Box>
                      <Typography variant="h6">Review your details</Typography>
                      {role === 'student' && (
                        <Box>
                          <Typography>Name: {studentDetails.name}</Typography>
                          <Typography>Email: {studentDetails.email}</Typography>
                          <Typography>Rollno : {studentDetails.rollno}</Typography>
                          
                        </Box>
                      )}
                      {role === 'teacher' && (
                        <Box>
                          <Typography>Name: {teacherDetails.name}</Typography>
                          <Typography>Email: {teacherDetails.email}</Typography>
                        </Box>
                      )}
                    </Box>
                  )}
                     <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Button
                      color="inherit"
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      sx={{ mr: 1 }}
                    >
                      Back
                    </Button>
                    <Box sx={{ flex: '1 1 auto' }} />
                    {activeStep === steps.length - 1 ? (
                      <Button onClick={handleSubmit}>
                        Submit
                      </Button>
                    ) : (
                      <Button onClick={handleNext}>
                        Next
                      </Button>
                    )}
                  </Box>
                </Box>
              </React.Fragment>
            )}
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}



export default SignupFunction;