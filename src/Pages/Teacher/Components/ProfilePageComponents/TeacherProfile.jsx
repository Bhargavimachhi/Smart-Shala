import React, { useEffect, useState, useRef } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useUserContext } from "@/context/userContext";
import { Pencil } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { fetchFile, uploadFile } from "../../../../../upload";
import axios from "axios";

const TeacherProfile = ({ teacher }) => {
  const [attendanceData, setAttendanceData] = useState([]);
  const currYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currYear);
  const [photo, setPhoto] = useState(null);
  const { userData } = useUserContext();
  const inputFile = useRef(null);

  useEffect(() => {
    let data = teacher.presentDays;

    data = data.map((date) => ({ day: date, value: 1 }));
    setAttendanceData(data);
  }, []);

  const changeImage = (e) => {
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

  const handleImageUpload = async () => {
    if (!photo) {
      toast.error("Upload Photo");
      return;
    }
    toast.loading("Uploading Image...");
    try {
      await uploadFile(
        photo,
        `/attentance/${userData._id}/reference`
      );
      const url = await fetchFile(
        `/attentance/${userData._id}/reference`
      );
      await axios.post(
        `http://localhost:3000/teacher/${userData._id}/upload-photo`,
        { url }
      );
      toast.dismiss();
      toast.success("Photo uploaded successfully");
    } catch (err) {
      toast.dismiss();
      toast.error("Error while uploading image");
    }
  };
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
            <Avatar
              sx={{ bgcolor: "primary.main", width: 64, height: 64 }}
              src={userData?.face}
            >
            </Avatar>
          </Grid>
          <Grid item>
            <Typography variant="h5" component="div" fontWeight="bold">
              {teacher.name || "Teacher Name"}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h5" component="div" fontWeight="bold">
              <Dialog>
                <DialogTrigger>
                  <Pencil className="cursor-pointer" />
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Your Photo</DialogTitle>
                    <DialogDescription>
                      Your uploaded photo will be used for your attendance
                      varification. Upload photo with clear face.
                    </DialogDescription>
                    <Avatar
                      sx={{ bgcolor: "primary.main", width: 64, height: 64 }}
                      src={userData?.face}
                    >
                      {userData?.face || <PersonIcon sx={{ fontSize: 40 }} />}
                    </Avatar>
                    <input
                      type="file"
                      ref={inputFile}
                      onChange={changeImage}
                      required
                    />
                    <Button onClick={handleImageUpload} className="mt-5" variant="secondary">
                      Submit Photo
                    </Button>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
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
