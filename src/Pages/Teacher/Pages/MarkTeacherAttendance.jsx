import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import TeacherLeftSideNavBar from "../Components/TeacherLeftSideNavBar";
import Webcam from "react-webcam";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { storage } from "../../../../firebase";
import axios from "axios";
import toast from "react-hot-toast";
import { Download } from "lucide-react";
const MarkTeacherAttendance = () => {
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
    ``;
    navigate("/teacher/manual-attendance");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <TeacherLeftSideNavBar
        isExpanded={isExpanded}
        toggleSidebar={toggleSidebar}
      />
      <div
        className={`flex-1 transition-all duration-300 ml-${
          isExpanded ? "64" : "16"
        } p-6 mr-50 overflow-x-auto`}
      >
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold text-center mb-8 bg-sky-800 w-full p-7 text-mox">
            Mark Attendance
            <handleManualAttendance />"
          </h1>

          <button
            className="bg-sky-800 text-white py-2 px-4 rounded-lg hover:bg-sky-800-600 transition"
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
                className="bg-sky-800 text-white py-2 px-4 rounded-lg hover:bg-sky-800-600 transition mt-2"
                onClick={capturePhoto}
              >
                Capture Photo
              </button>
            </div>
          )}

          <div className="mt-4 text-center">
            <p className="text-gray-600">OR</p>
            <button
              className="bg-sky-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition mt-2"
              onClick={handleManualAttendance}
            >
              Mark Attendance Manually
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarkTeacherAttendance;
