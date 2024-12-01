import React, { useState } from "react";
import { RiUploadCloudLine } from "react-icons/ri";
import { storage } from "../../../../../firebase";
import { ref, uploadBytes } from "firebase/storage";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom"; // For navigation
import PendingList from "./PendingList";
import PendingHomeWork from "./PendingHomeWork";

const SubmitHWmainBox = () => {
  const [activeTab, setActiveTab] = useState("english");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // For navigation

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    console.log("File selected:", file);
    setUploadedFile(file);
  };

  const handleFileUpload = async () => {
    if (!uploadedFile) {
      toast.error("No file selected!");
      return;
    }

    const fileType = uploadedFile.type;

    if (fileType === "application/pdf") {
      const toastId = toast.loading("Uploading your homework...");

      try {
        setLoading(true);

        const refoffile = ref(storage, `homeworks/${uploadedFile.name}`);
        uploadBytes(refoffile, uploadedFile).then((snapshot) => {
          console.log("Uploaded a blob or file!", snapshot);
          toast.dismiss(toastId);
          toast.success("Homework uploaded successfully!");
          setLoading(false);
          setUploadedFile(null);
        });
      } catch (error) {
        console.log(error);
        toast.dismiss(toastId);
        toast.error("Failed to upload homework!");
        setLoading(false);
        setUploadedFile(null);
      }
    } else {
      toast.error("Only PDF files are allowed!");
    }
  };

  return (
    <div className={`rounded-lg p-6 mt-10 bg-white border-2 border-gray-100 ${loading ? "opacity-50" : ""}`}>
      <h1 className="text-2xl font-bold mb-6 text-center">Submit Homework</h1>

      {/* Upload Section */}
      <div className="flex flex-col items-center">
        <label className="cursor-pointer flex flex-col items-center bg-blue-500 text-white px-4 py-2 rounded-lg">
          <RiUploadCloudLine className="text-2xl mr-2" />
          Upload File
          <input type="file" className="hidden" onChange={handleFileSelect} />
        </label>
        {uploadedFile && <p className="mt-4 text-gray-700">Selected file: {uploadedFile.name}</p>}
        {loading && <p className="mt-4 text-blue-500">Uploading...</p>}
      </div>

      {/* Submit Button */}
      <button
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition mt-4"
        onClick={handleFileUpload}
        disabled={loading}
      >
        Submit
      </button>
  
      {/* Pending Homework Section */}

    </div> 
    
  );
};

export default SubmitHWmainBox;
