import { useState } from "react";
import { StudentRegistrationImage } from "../../Admin/Icons/NavIcon.jsx";
import axios from 'axios'
import { Container, TextField, Button, Typography, Box, Paper } from '@mui/material';
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


const AdminForm = () => {
  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
   
    const [loading,setloading] = useState(false);
    const navigate = useNavigate();

    
  const HandleTeacherSubmit = async(e) => {
    
    e.preventDefault();

  console.log(email,password);

  try {


    const res = await axios.post('http://localhost:3000/addAdmin',{email,password});
    console.log(res.data); 
    if(res.status === 200){
      toast.success("Admin added successfully");
      navigate("/login/admin");

    }
    else{
      toast.error("Admin already exist");
      } 
    
  } catch (error) {
    toast.error("Error in adding Admin.Please try again");
  }

   
   
  };

  if(loading){

    toast.loading("Loading...Please wait");

  };

  return (
    <>
       <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 25 }}>
        <Typography component="h1" variant="h5" align="center" gutterBottom>
          Admin Signup
        </Typography>
        <Box component="form" onSubmit={HandleTeacherSubmit}  sx={{ mt: 1 }}>
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
      </Paper>
    </Container>
    </>
  );
};



export default AdminForm;
