import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, List,Chip,Box  } from '@mui/material';




const Createclassroom = () => {

    const [newClassroomName, setNewClassroomName] = useState('');
    const [open, setOpen] = useState(false);
    const [subjectopen, setSubjectOpen] = useState(false);
    const [subject,setsubjects] = useState([]);
    const [subjectadded,setsubjectadded] = useState("");
    const savedAuth = JSON.parse(localStorage.getItem("auth"));

    const handleOpenDialog = () => {
        setOpen(true);
      };
    
      const handleCloseDialog = () => {
        setOpen(false);
        setsubjects([]);
        setsubjectadded("");
        
      };

      const handleSubjectDialog = () => {
        setSubjectOpen(true);
      };
    
      const handleSubjectCloseDialog = () => {
      setSubjectOpen(false);
      };

      const handleSubjectadd = () =>{
        if(subjectadded){
          setsubjects((prevSubjects) => [...prevSubjects, subjectadded]);
          setsubjectadded("");
          setSubjectOpen(false);
         }
        
      }
    
      const handleCreateClassroom = async () => {
        try {
          const response = await axios.post(`http://localhost:3000/admin/${savedAuth.id}/assign-classroom`, {
            name : newClassroomName,
            subjects : subject
          });
          window.location.reload();
          alert(response.data.message);
        } catch (error) {
          console.error('Error generating issue:', error);
          alert('Failed to generate issue');
        }
      };
  return (
    <>

<Button variant="contained" color="primary" onClick={handleOpenDialog}>
              Create Classroom
            </Button>

<Dialog open={open} onClose={handleCloseDialog} maxWidth="lg" fullWidth>
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

<Button variant="contained" color="primary" onClick={handleSubjectDialog}>
              Add subject
            </Button>
            <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              <h1>Subjects Added : </h1>
            {subject.map((subject, index) => (
              <Chip key={index} label={subject} />
            ))}
          </Box>
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

      <Dialog open={subjectopen} onClose={handleSubjectCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Type your subject</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Subject Name"
            type="text"
            fullWidth
            value={subjectadded}
            onChange={(e) => setsubjectadded(e.target.value)}
          />


          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubjectCloseDialog} color="primary">
            Cancel
          </Button>
          <Button color="primary" onClick={handleSubjectadd}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    
    
    
    </>
  )
}

export default Createclassroom