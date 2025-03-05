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

const addteachertoclassroom = ({ teachers, onAddTeacher, classroom }) => {
  const [openTeacherDialog, setOpenTeacherDialog] = useState(false);
  const [teacherEmail, setTeacherEmail] = useState(null);
  const savedAuth = JSON.parse(localStorage.getItem("auth"));

  const handleOpenTeacherDialog = () => {
    setOpenTeacherDialog(true);
  };

  const handleCloseTeacherDialog = () => {
    setOpenTeacherDialog(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form default behavior
    if (!teacherEmail) {
      toast.error("Please enter a valid email.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:3000/admin/${savedAuth.id}/assign-teacher`,
        { email: teacherEmail }
      );
      toast.success("Teacher added successfully!");
      setTeacherEmail(null);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <div className="flex justify-between">
        <Typography variant="h5" className="mb-4">
          Teachers
        </Typography>
        <Button
          variant="contained"
          color="primary"
          className="mb-4"
          onClick={handleOpenTeacherDialog}
        >
          Add Teachers
        </Button>
      </div>

      <Dialog
        open={openTeacherDialog}
        onClose={handleCloseTeacherDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Add Teacher</DialogTitle>
        <DialogContent>
          <form className="flex flex-col gap-5">
            <input
              type="email"
              value={teacherEmail}
              onChange={(e) => setTeacherEmail(e.target.value)}
              className="border px-4 py-5 mb-5 rounded-md"
              placeholder="Enter Email"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseTeacherDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={(e) => {
              handleSubmit(e);
              handleCloseTeacherDialog();
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

export default addteachertoclassroom;
