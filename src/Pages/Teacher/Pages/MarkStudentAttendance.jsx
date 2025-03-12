import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import TeacherLeftSideNavBar from "../Components/TeacherLeftSideNavBar";
import Webcam from "react-webcam";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { storage } from "../../../../firebase";
import axios from "axios";
import toast from "react-hot-toast";
import { Download } from "lucide-react";
import { ICONS } from "../Icons/icons";
const MarkStudentAttendance = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState("");
  const webcamRef = useRef(null);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const requestCameraPermission = () => {
    setHasPermission(true);
    capturePhoto();
  };

  const capturePhoto = async () => {
    const screenshot = webcamRef.current.getScreenshot({ format: "jpeg" });
    setPhoto(screenshot);
    if (screenshot) {
      const imageRef = ref(storage, `Attendance/current/1`);
      const refimageref = ref(storage, `Attendance/Reference/image.jpg`);

      try {
        // await uploadString(imageRef, screenshot, "data_url");
        await uploadString(imageRef, screenshot, "data_url");
        const downloadURL = await getDownloadURL(imageRef);
        const refdownloadURL = await getDownloadURL(refimageref);
        alert("Image uploaded successfully");
        toast.loading("Processing the images");
        console.log(downloadURL);
        const res = await axios.post("http://localhost:8000/verify", {
          image1_url: downloadURL,
          image2_url: refdownloadURL,
        });
        console.log(res);

        if (res.data.verified) {
          alert("Attendance marked successfully");
          toast.success("Attendance marked successfully");
        } else {
          alert("Attendance not marked, please try again");
        }
      } catch (error) {
        console.error("Error uploading image: ", error);
      }
    }
  };

  const handleManualAttendance = () => {
    navigate("/teacher/manual-attendance");
  };

  return (
    <main>
      <div className="bg-white">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 mb-6 border-b border-btn">
          <div className="flex items-center gap-2 text-text">
            <span>
              <ICONS.MARK_STU_ATTENDANCE size={30} />
            </span>
            <h1 className="text-2xl font-semibold ">Mark Student Attendance</h1>
          </div>
        </div>
        <div className="flex flex-col items-center">
          {/* <handleManualAttendance /> */}

          <button
            className="px-4 py-2 text-white transition rounded-lg bg-sky-800 hover:bg-sky-800-600"
            onClick={requestCameraPermission}
          >
            Request Camera Permission
          </button>
          {hasPermission && (
            <div className="mt-4">
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                className="rounded-lg"
              />
              <button
                className="px-4 py-2 mt-2 text-white transition rounded-lg bg-sky-800 hover:bg-sky-800-600"
                onClick={capturePhoto}
              >
                Capture Photo
              </button>
            </div>
          )}

          <div className="mt-4 text-center">
            <p className="text-gray-600">OR</p>
            <button
              className="px-4 py-2 mt-2 text-white transition rounded-lg bg-sky-500 hover:bg-green-600"
              onClick={handleManualAttendance}
            >
              Mark Attendance Manually
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MarkStudentAttendance;
