import { useState, useRef } from "react";
import { StudentRegistrationImage } from "../Icons/NavIcon.jsx";
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
import { fetchFile, uploadFile } from "../../../../upload.js";
import { ImagePlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Loader from "@/Pages/InitialPages/Loader.jsx";

const AdminForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState(null);
  const inputFile = useRef(null);
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    if (e.target.files) {
      if (e.target.files[0].type.split("/")[0] != "image") {
        inputFile.current.value = "";
        inputFile.current.type = "text";
        inputFile.current.type = "file";
        toast.error("Enter Valid Image");
        return;
      }
      setPhoto(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.loading("Registering User...");
    if (password.length < 6) {
      toast.error("Password must be atleast 6 charcater long");
      return;
    }

    try {
      const responce = await axios.post("http://localhost:3000/signup/admin", {
        email,
        password,
        name,
      });
      await uploadFile(
        photo,
        `/attentance/${responce.data.admin._id}/reference`
      );
      const url = await fetchFile(
        `/attentance/${responce.data.admin._id}/reference`
      );
      await axios.post(
        `http://localhost:3000/admin/${responce.data.admin._id}/upload-photo`,
        { url }
      );
      setloading(false);
      if (responce.status === 200) {
        toast.dismiss();
        toast.success("Admin added successfully");
        navigate("/login/admin");
      } else {
        toast.dismiss();
        toast.error("Admin already exist");
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error.response.data.message);
    }
  };

  if (loading) {
    return <Loader text="Loading..." />;
  }

  return (
    <>
      <Container component="main" maxWidth="sm">
        <Paper elevation={3} sx={{ padding: 4, marginTop: 10 }}>
          <Typography component="h1" variant="h5" align="center" gutterBottom>
            School Signup
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Enter Name Of School"
              name="name"
              type="text"
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
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

            <div className="flex flex-col gap-2">
              <label className="block">
                Upload Image for Attendance Purpose :
              </label>
              <div className="mx-auto flex cursor-pointer flex-col items-center justify-center gap-y-2 rounded-lg border border-foreground p-4 shadow-sm shadow-foreground">
                <ImagePlus className={`size-20 block`} />
                <input
                  type="file"
                  ref={inputFile}
                  onChange={handleFileChange}
                  required
                />
              </div>
            </div>

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
            <Link href="/login/admin" underline="hover">
              Log In
            </Link>
          </FormHelperText>
        </Paper>
      </Container>
    </>
  );
};

export default AdminForm;
