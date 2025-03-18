import React, { useState, useRef, useEffect } from "react";
import "../css/AdminHome.css";
import SideNavbar from "../../../components/SideNavbar.jsx";
import DataCard from "../Components/HomePageComponents/DataCard.jsx";
import toast from "react-hot-toast";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUserContext } from "@/context/userContext";
import { Pencil } from "lucide-react";
import PersonIcon from "@mui/icons-material/Person";
import { ResponsiveCalendar } from "@nivo/calendar";
import { Button } from "@/components/ui/button";
import { uploadFile, fetchFile } from "../../../../upload";

const AdminHome = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const currYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currYear);
  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState(null);
  const { userData } = useUserContext();
  const inputFile = useRef(null);

  useEffect(() => {
    let data = userData.presentDays;
    if (data) {
      data = data.map((date) => ({ day: date, value: 1 }));
      setAttendanceData(data);
    }
  }, [userData]);

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
      await uploadFile(photo, `/attentance/${userData._id}/reference`);
      const url = await fetchFile(`/attentance/${userData._id}/reference`);
      await axios.post(
        `http://localhost:3000/admin/${userData._id}/upload-photo`,
        { url }
      );
      toast.dismiss();
      toast.success("Photo uploaded successfully");
    } catch (err) {
      console.log(err);
      toast.dismiss();
      toast.error("Error while uploading image");
    }
  };

  return (
    <>
      <div className="w-full m-5 overscroll-x-none">
        <div className="overscroll-y-none overscroll-x-none w-full">
          <Card
            sx={{
              margin: "auto",
              boxShadow: 3,
              borderRadius: 3,
              bgcolor: "#f9f9f9",
            }}
            className="w-full mt-10"
          >
            <CardContent>
              <div id="main-container" className="w-full">
                <div id="middle-left" className="max-h-screen p-3 w-full">
                  <DataCard />
                </div>
              </div>
            </CardContent>
            <CardContent>
              <Grid
                container
                spacing={2}
                alignItems="center"
                justifyContent="start"
              >
                <Grid item>
                  <Avatar
                    sx={{ bgcolor: "primary.main", width: 64, height: 64 }}
                    src={userData?.face}
                  ></Avatar>
                </Grid>
                <Grid item>
                  <Typography variant="h5" component="div" fontWeight="bold">
                    {userData.name || "School Name"}
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
                            sx={{
                              bgcolor: "primary.main",
                              width: 64,
                              height: 64,
                            }}
                            src={userData?.face}
                          >
                            {userData?.face || (
                              <PersonIcon sx={{ fontSize: 40 }} />
                            )}
                          </Avatar>
                          <input
                            type="file"
                            ref={inputFile}
                            onChange={changeImage}
                            required
                          />
                          <Button
                            onClick={handleImageUpload}
                            className="mt-5"
                            variant="secondary"
                          >
                            Submit Photo
                          </Button>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
            <CardContent>
              <Box sx={{ px: 1 }}>
                {userData.email && (
                  <Typography variant="body1" className="mb-2" gutterBottom>
                    <strong>Email :</strong> {userData.email}
                  </Typography>
                )}
              </Box>
              <Divider sx={{ my: 2 }} />
            </CardContent>
            <CardContent>
              <div className="p-6 bg-white shadow-lg rounded-2xl">
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
        </div>
      </div>
    </>
  );
};

export default AdminHome;
