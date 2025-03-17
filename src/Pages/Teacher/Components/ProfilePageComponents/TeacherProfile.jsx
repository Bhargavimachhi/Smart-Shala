import React, { useEffect, useState } from "react";
import {
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
import { ResponsiveCalendar } from "@nivo/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TeacherProfile = ({ teacher }) => {
  const [attendanceData, setAttendanceData] = useState([]);
  const currYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currYear);

  useEffect(() => {
    let data = teacher.presentDays;

    data = data.map((date) => ({ day: date, value: 1 }));
    setAttendanceData(data);
  }, []);
  return (
    <Card
      sx={{
        margin: "auto",
        mt: 4,
        boxShadow: 3,
        borderRadius: 3,
        bgcolor: "#f9f9f9",
      }}
      className="w-full"
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
      <CardContent>
        <div className="p-6 mt-6 bg-white shadow-lg rounded-2xl">
          <h3 className="mb-4 text-xl font-bold text-center">
            Attendance Overview
          </h3>
          <Select
            value={selectedYear}
            onValueChange={(e) => {
              setSelectedYear(e);
            }}
          >
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Select Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={currYear}>{currYear}</SelectItem>
              <SelectItem value={currYear - 1}>{currYear - 1}</SelectItem>
              <SelectItem value={currYear - 2}>{currYear - 2}</SelectItem>
              <SelectItem value={currYear - 3}>{currYear - 3}</SelectItem>
              <SelectItem value={currYear - 4}>{currYear - 4}</SelectItem>
            </SelectContent>
          </Select>
          <div className="h-60">
            <ResponsiveCalendar
              data={attendanceData}
              from={`${selectedYear}-01-01`}
              to={`${selectedYear}-12-31`}
              emptyColor="#eeeeee"
              colors={["#33cc33"]}
              margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
              yearSpacing={40}
              monthBorderColor="#ffffff"
              dayBorderWidth={2}
              dayBorderColor="#ffffff"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TeacherProfile;
