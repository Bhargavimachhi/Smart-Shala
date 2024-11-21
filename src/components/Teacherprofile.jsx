import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, List, ListItem, ListItemText } from '@mui/material';
import { useState } from 'react';
const Teacherprofile = ({Teachers}) => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        View Teacher Profile
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Teacher Profile</DialogTitle>
        <DialogContent>
          <Typography variant="h6" className="mb-4">Name: {Teachers.name}</Typography>
          <Typography variant="body1" className="mb-2">Email: {Teachers.email}</Typography>
          <Typography variant="body1" className="mb-2">Contact: {Teachers.contact}</Typography>
          <Typography variant="body1" className="mb-2">Address: {Teachers.address}</Typography>
          <Typography variant="body1" className="mb-2">Available Classrooms:</Typography>
          <List>
            {Teachers.classrooms?.map((classroom, index) => (
              <ListItem key={index}>
                <ListItemText primary={classroom} />
              </ListItem>
            ))}
          </List>
          <Typography variant="body1" className="mb-2">Subjects:</Typography>
          <List>
            {Teachers.subjects?.map((subject, index) => (
              <ListItem key={index}>
                <ListItemText primary={subject} />
              </ListItem>
            ))}
          </List>
          </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
   
  );
};

export default Teacherprofile