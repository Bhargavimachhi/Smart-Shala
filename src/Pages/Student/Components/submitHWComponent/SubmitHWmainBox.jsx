import React, { useState } from "react";
import { RiUploadCloudLine } from "react-icons/ri";
const SubmitHWmainBox = () => {
  const [activeTab, setActiveTab] = useState("english");
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setUploadedFile(file);
  };

  return (
    <div className="rounded-lg p-6 mt-10 bg-white border-2 border-gray-100 ">
      <h1 className="text-2xl font-bold mb-6">Submit Homework</h1>    

      {/* Navigation Tabs */}
      <nav className="flex border-b mb-6">
        <div
          onClick={() => setActiveTab("english")}
          className={`cursor-pointer px-4 py-2 text-lg ${
            activeTab === "english"
              ? "text-blue-700 border-b-2 border-blue-600"
              : "text-gray-700"
          }`}
        >
          English
        </div>
        <div
          onClick={() => setActiveTab("maths")}
          className={`cursor-pointer px-4 py-2 text-lg ${
            activeTab === "maths"
              ? "text-blue-700 border-b-2 border-blue-600"
              : "text-gray-700"
          }`}
        >
          Mathematics
        </div>
        <div
          onClick={() => setActiveTab("ss")}
          className={`cursor-pointer px-4 py-2 text-lg ${
            activeTab === "ss"
              ? "text-blue-700 border-b-2 border-blue-600"
              : "text-gray-700"
          }`}
        >
          Social Studies
        </div>
      </nav>

      {/* Upload Section */}
      <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-10 mb-4">
        <label htmlFor="file-upload" className="cursor-pointer">
          <div className="flex flex-col items-center">
          <RiUploadCloudLine className="text-blue-500" size={48} />
            <p className="text-gray-500 mt-2">Upload your files</p>
            <p className="text-gray-400 text-sm">(Drag & Drop or Click to Upload)</p>
          </div>
        </label>
        <input
          id="file-upload"
          type="file"
          onChange={handleFileUpload}
          className="hidden"
        />
        {uploadedFile && (
          <p className="text-green-600 mt-2">{uploadedFile.name} uploaded successfully!</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        onClick={() => alert("Homework submitted successfully!")}
      >
        Submit
      </button>
    </div>
  );
};

export default SubmitHWmainBox;
