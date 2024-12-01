import React, { useState } from "react";
import { useLocation } from "react-router-dom"; // For retrieving navigation state
import { RiUploadCloudLine } from "react-icons/ri";
import { storage } from "../../../../../firebase";
import { ref, uploadBytes } from "firebase/storage";
import { toast } from "react-hot-toast";
import LeftSideNavbar from "../LeftSideNavBar";

const PendingHomeWork = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { state } = useLocation(); // Retrieve the data passed during navigation
  const [uploadedFile, setUploadedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleToggleSidebar = () => {
    setIsExpanded((prevState) => !prevState);
  };
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
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
        await uploadBytes(refoffile, uploadedFile);
        toast.dismiss(toastId);
        toast.success("Homework uploaded successfully!");
        setUploadedFile(null);
      } catch (error) {
        console.error(error);
        toast.dismiss(toastId);
        toast.error("Failed to upload homework!");
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("Only PDF files are allowed!");
    }
  };

  return (
    <>
       <LeftSideNavbar
        isExpanded={isExpanded}
        toggleSidebar={handleToggleSidebar}
      />
      <div
        className={`flex-1 transition-all duration-300 ml-${
          isExpanded ? "64" : "16"
        } p-6 mr-50 overflow-x-auto`}
      > 
       <h1 className="text-2xl font-bold mb-4 border-gray-100  p-2 text-center">
        Pending Homework
      </h1> 
      <div className="p-6 bg-white min-h-screen">
        {/* Render Subject Details */}
        {state ? (
          <div className="mb-6 border-2 border-gray-100 bg-blue rounded-lg items-center p-5">
            <h1 className="text-2xl font-bold mb-5 text-center border-b-2 p-2 text-white">Subject : {state.subject}</h1>
            <p className="text-red-400 font-bold text-center">Deadline: {state.deadline}</p>
            <p className="text-gray-300 mt-2">Note: {state.description}</p>
          </div>
        ) : (
          <p>No homework details available.</p>
        )}

        {/* Submit Homework Section */}
        <div
          className={`rounded-lg p-20 mt-10 bg-white border-2 border-gray-100 ${
            loading ? "opacity-50" : ""
          }`}
        >
          <h2 className="text-xl font-bold mb-8 text-center">Submit Homework</h2>
          <div className="flex flex-col items-center m-4">
            <label className="cursor-pointer flex flex-col items-center bg-blue text-white px-4 py-2 rounded-lg">
              <RiUploadCloudLine className="text-2xl mr-2 mb-3" />
              Upload File
              <input type="file" className="hidden" onChange={handleFileSelect} />
            </label>
            {uploadedFile && (
              <p className="mt-4 text-gray-700">Selected file: {uploadedFile.name}</p>
            )}
            {loading && <p className="mt-4 text-blue-500">Uploading...</p>}
          </div>
          <button
            className="w-full bg-blue text-white py-2 rounded-lg hover:bg-blue-700 transition mt-4"
            onClick={handleFileUpload}
            disabled={loading}
          >
            Submit
          </button>
        </div>
      </div>
      </div>
    </>
  );
};

export default PendingHomeWork;
