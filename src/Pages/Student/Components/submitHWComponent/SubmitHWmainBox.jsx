import React, { useState } from "react";
import { RiUploadCloudLine } from "react-icons/ri";
import { storage } from "../../../../../firebase";
import { getStorage, ref,uploadBytes,getDownloadURL } from "firebase/storage";
import { toast } from "react-hot-toast";
import { set } from "mongoose";
const SubmitHWmainBox = () => {
  const [activeTab, setActiveTab] = useState("english");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [loading,setloading] = useState(false);

  const handleFileSelect =  (event) => {
    const file = event.target.files[0];
    console.log("File selected:", file);
    setUploadedFile(file);
  };


  const handleFileUpload = async (event) => {
   
   
    
    const fileType = uploadedFile.type;

    if(fileType === "application/pdf"){
      const toastId = toast.loading("Uploading your homework...");

     

      try {
        
      setloading(true);
      

      
     
        const refoffile = ref(storage, `homeworks/${uploadedFile.name}`);
        uploadBytes(refoffile, uploadedFile).then((snapshot) => {
          console.log("Uploaded a blob or file!", snapshot);
          toast.dismiss(toastId);
          toast.success("Homework uploaded successfully!");
          setloading(false);
          setUploadedFile(null);
        });
        
      } catch (error) {

        console.log(error);
        toast.dismiss(toastId);
        toast.error("Failed to upload homework!");
        setloading(false);
        setUploadedFile(null);
      }


    }



    
    
  };

  

  return (
    <div className={`rounded-lg p-6 mt-10 bg-white border-2 border-gray-100 ${loading ? 'opacity-50' : ''}`}>
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
        {/* <label htmlFor="file-upload" className="cursor-pointer">
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
      </div> */}
      <div className="flex flex-col items-center">
        <label className="cursor-pointer flex flex-col items-center bg-blue-500 text-white px-4 py-2 rounded-lg">
          <RiUploadCloudLine className="text-2xl mr-2" />
          Upload File
          <input type="file" className="hidden" onChange={handleFileSelect} />
        </label>
        {uploadedFile && (
          <p className="mt-4 text-gray-700">
            Selected file: {uploadedFile.name}
          </p>
        )}
        {loading && <p className="mt-4 text-blue-500">Uploading...</p>}
       
      </div>

      {/* Submit Button */}
     
      </div>
      <button
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        onClick={handleFileUpload}
        disabled={loading}
      >
        Submit
      </button>
    </div>
  );
};

export default SubmitHWmainBox;
