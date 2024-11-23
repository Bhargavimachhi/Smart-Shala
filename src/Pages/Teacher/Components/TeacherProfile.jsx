import React from 'react';
import { DialogContent, Typography, List, ListItem, ListItemText } from '@mui/material';

const TeacherProfile = ({ teacher }) => {
  return (
    <div>
      <DialogContent>
        <Typography variant="body1" className="mb-2">{teacher.email ? `Email: ${teacher.email}` : ``}</Typography>
        <Typography variant="body1" className="mb-2">{teacher.contact ? `Contact: ${teacher.contact}` : ``}</Typography>
        <Typography variant="body1" className="mb-2">{teacher.address ? `Address: ${teacher.address}` : ``}</Typography>
        <Typography variant="body1" className="mb-2">Subjects:</Typography>
        <List>
          {teacher.subjects?.map((subject, index) => (
            <ListItem key={index}>
              <ListItemText primary={subject} />
            </ListItem>
          ))}
        </List>
      </DialogContent>
    </div>
  );
};

export default TeacherProfile;