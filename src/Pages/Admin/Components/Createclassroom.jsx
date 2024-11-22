import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Card, CardContent, Typography, IconButton } from '@mui/material';



const Createclassroom = () => {

    const [newClassroomName, setNewClassroomName] = useState('');
    const [open, setOpen] = useState(false);

    const handleOpenDialog = () => {
        setOpen(true);
      };
    
      const handleCloseDialog = () => {
        setOpen(false);
      };
    
      const handleCreateClassroom = async () => {
        // Add logic to create a classroom
       console.log(newClassroomName);
      };
  return (
    <>

<Button variant="contained" color="primary" onClick={handleOpenDialog}>
              Create Classroom
            </Button>

<Dialog open={open} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Create Classroom</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Classroom Name"
            type="text"
            fullWidth
            value={newClassroomName}
            onChange={(e) => setNewClassroomName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCreateClassroom} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    
    
    
    </>
  )
}

export default Createclassroom