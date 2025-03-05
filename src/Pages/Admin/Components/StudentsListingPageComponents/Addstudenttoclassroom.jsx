import React, { useState } from "react";
import {
  Typography,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  Checkbox,
} from "@mui/material";
import toast from "react-hot-toast";
import axios from "axios";

const Addstudenttoclassroom = ({ students, onAddStudent }) => {
  const [openStudentDialog, setOpenStudentDialog] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [studentEmail, setStudentEmail] = useState("");
  const savedAuth = JSON.parse(localStorage.getItem("auth"));

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form default behavior
    if (!studentEmail) {
      toast.error("Please enter a valid email.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:3000/admin/${savedAuth.id}/assign-student`,
        { email: studentEmail }
      );
      toast.success("Student added successfully!");
      setStudentEmail(null);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleOpenStudentDialog = () => {
    setOpenStudentDialog(true);
  };

  const handleCloseStudentDialog = () => {
    setOpenStudentDialog(false);
  };

  return (
    <>
      <div className="flex justify-between">
        <Typography variant="h5" className="mb-4">
          Students
        </Typography>
        <Button
          variant="contained"
          color="primary"
          className="mb-4 text-white bg-[rgb(45,132,239)] hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 me-2 mb-2"
          onClick={handleOpenStudentDialog}
        >
          Add Students
        </Button>
      </div>

      <Dialog
        open={openStudentDialog}
        onClose={handleCloseStudentDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Add Student</DialogTitle>
        <DialogContent>
          <form className="flex flex-col gap-5">
            <input
              type="email"
              value={studentEmail}
              onChange={(e) => setStudentEmail(e.target.value)}
              className="border px-4 py-5 mb-5 rounded-md"
              placeholder="Enter Email"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseStudentDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={(e) => {
              handleSubmit(e);
              handleCloseStudentDialog();
            }}
            color="primary"
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Addstudenttoclassroom;
