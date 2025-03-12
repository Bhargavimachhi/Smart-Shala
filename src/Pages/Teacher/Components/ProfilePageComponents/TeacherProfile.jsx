import React from "react";
import {
  DialogContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Card,
  CardContent,
  Avatar,
  Divider,
  Grid,
  Box,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

const TeacherProfile = ({ teacher }) => {
  return (
    <Card
      sx={{
        maxWidth: 500,
        margin: "auto",
        mt: 4,
        boxShadow: 3,
        borderRadius: 3,
        bgcolor: "#f9f9f9",
      }}
    >
      <CardContent>
        <Grid container spacing={2} alignItems="center" justifyContent="start">
          <Grid item>
            <Avatar sx={{ bgcolor: "primary.main", width: 64, height: 64 }}>
              <PersonIcon sx={{ fontSize: 40 }} />
            </Avatar>
          </Grid>
          <Grid item>
            <Typography variant="h5" component="div" fontWeight="bold">
              {teacher.name || "Teacher Name"}
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ px: 1 }}>
          {teacher.email && (
            <Typography variant="body1" className="mb-2" gutterBottom>
              <strong>Email :</strong> {teacher.email}
            </Typography>
          )}

          {teacher.contact && (
            <Typography variant="body1" className="mb-2" gutterBottom>
              <strong>Contact :</strong> {teacher.contact}
            </Typography>
          )}

          {teacher.address && (
            <Typography variant="body1" className="mb-2" gutterBottom>
              <strong>Address :</strong> {teacher.address}
            </Typography>
          )}

          {teacher.subjects && teacher.subjects.length > 0 && (
            <>
              <Typography
                variant="body1"
                className="mb-2"
                gutterBottom
                sx={{ mt: 2 }}
              >
                <strong>Subjects:</strong>
              </Typography>
              <List dense>
                {teacher.subjects.map((subject, index) => (
                  <ListItem
                    key={index}
                    sx={{
                      px: 0,
                      py: 0.5,
                      borderBottom: "1px solid #e0e0e0",
                    }}
                  >
                    <ListItemText primary={subject} />
                  </ListItem>
                ))}
              </List>
            </>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default TeacherProfile;
