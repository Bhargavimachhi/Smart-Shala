import React, { useState, useEffect, useRef } from "react";
import LeftSideNavbar from "../Components/LeftSideNavBar";
import "../css/rawcss.css";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "@/context/userContext";
import Loader from "@/Pages/InitialPages/Loader";
import { ResponsiveCalendar } from "@nivo/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { fetchFile, uploadFile } from "../../../../upload";
import axios from "axios";

const StudentHomePage = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [attendanceData, setAttendanceData] = useState([]);
  const navigate = useNavigate();
  const { userData } = useUserContext();
  const currYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currYear);
  const [photo, setPhoto] = useState(null);
  const inputFile = useRef(null);

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
        `http://localhost:3000/student/${userData._id}/upload-photo`,
        { url }
      );
      toast.dismiss();
      toast.success("Photo uploaded successfully");
    } catch (err) {
      toast.dismiss();
      toast.error("Error while uploading image");
    }
  };

  useEffect(() => {
    async function fetchAttendance() {
      try {
        let data = userData.presentDays;

        data = data.map((date) => ({ day: date, value: 1 }));
        setAttendanceData(data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    }
    fetchAttendance();
  }, [navigate, userData]);

  const studentInfo = {
    name: userData?.name,
    email: userData?.email,
    standard: "12th Grade",
    address: userData?.address,
    contact: userData?.contact,
  };

  if (loading) {
    return <Loader text="Loading User..." />;
  }

  return (
    <>
      <div className="flex flex-col min-h-screen md:flex-row">
        {/* Left Sidebar */}
        <LeftSideNavbar
          isExpanded={isExpanded}
          toggleSidebar={() => setIsExpanded(!isExpanded)}
        />

        {/* Main Content */}
        <div
          className={`flex-1 p-4 ${
            isExpanded ? "ml-56" : "ml-16"
          } transition-all duration-300`}
        >
          <div className="flex flex-col items-center justify-between p-2 shadow-sm md:flex-row">
            <div className="max-w-3xl text-center md:text-left">
              <h1 className="text-2xl font-bold leading-tight text-btn">
                Tomorrow will be a fantastic day for you, {studentInfo.name} 😁
              </h1>
              <p className="my-2 text-sm text-text">
                But only if you finish your homework today!
              </p>
            </div>
          </div>

          {/* Student Information */}
          <div className="p-4 mt-4 bg-white border rounded-lg shadow-md border-btn">
            <h2 className="mb-4 text-2xl font-semibold text-start text-text">
              Student Information
            </h2>
            <hr className="mb-4 border border-b-btn" />
            <div className="flex items-center justify-start mb-4">
              <Avatar
                sx={{ bgcolor: "primary.main", width: 64, height: 64 }}
                src={userData?.face}
              >
              </Avatar>
              
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
            </div>
            <div className="grid grid-cols-1 gap-4 text-start md:grid-cols-2 text-text">
              <p>
                <span className="font-bold">Name : </span> {studentInfo.name}
              </p>
              <p>
                <span className="font-bold">Email : </span> {studentInfo.email}
              </p>
              <p>
                <span className="font-bold">Standard : </span>{" "}
                {studentInfo.standard}
              </p>
              <p>
                <span className="font-bold">Address : </span>{" "}
                {studentInfo.address}
              </p>
              <p>
                <span className="font-bold">Contact : </span>+91{" "}
                {studentInfo.contact}
              </p>
            </div>
          </div>

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
        </div>
      </div>
    </>
  );
};

export default StudentHomePage;
