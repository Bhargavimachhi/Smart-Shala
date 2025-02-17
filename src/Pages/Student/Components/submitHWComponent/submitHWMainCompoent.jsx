import React, { useState } from "react";
import { RiUploadCloudLine } from "react-icons/ri";
import toast from "react-hot-toast";
import { storage } from '../../../../../firebase';
import { ref, uploadBytes } from "firebase/storage";
import { getDownloadURL } from 'firebase/storage';
import { useParams } from "react-router-dom";
import LeftSideNavbar from "../LeftSideNavBar";
import axios from "axios";

const SubmitHWmainBox = () => {
  const {id} = useParams();
  const [isExpanded, setIsExpanded] = useState(false);
  const savedAuth = JSON.parse(localStorage.getItem("auth"));
  const [selectedFile, setSelectedFile] = useState(null);
  const [url, setUrl] = useState('');
  const [message, setMessage] = useState('');

  const handleFileInput = async(event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    
    const refoffile = ref(storage, `/homeworks/${id}/${savedAuth.id}`);
    await uploadBytes(refoffile, file);

    const fileRef = ref(storage, `/homeworks/${id}/${savedAuth.id}`);
    const url = await getDownloadURL(fileRef);
    setUrl(url);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const fileType = selectedFile?.type;

      if(fileType === "application/pdf"){
        const toastId = toast.loading("Uploading your  teacher homework...");
        try {
            const res = await axios.get(`http://localhost:3000/student/${savedAuth.id}/homework/${id}/submit`);
            if(res.status != 200) {
                toast.error("Failed to upload homework!");
                return;
            }
            const refoffile = ref(storage, `/homeworks/${id}/${savedAuth.id}`);
            await uploadBytes(refoffile, selectedFile).then((snapshot) => {
            console.log("Uploaded homework successfully!", snapshot);
            toast.dismiss(toastId);
            toast.success("Homework uploaded successfully!");
            
            setSelectedFile(null);
          });
          
        } catch (error) {
  
          console.log(error);
          toast.dismiss(toastId);
          toast.error("Failed to upload homework!");
        
          setSelectedFile(null);
        }
      }
    } catch (error) {
      console.error('Error assigning homework:', error);
      toast.error('Failed to submit homework');
    }
  };
  const handleToggleSidebar = () => {
    setIsExpanded((prevState) => !prevState);
  };

  return (
    <div className="rounded-lg p-6 mt-10 bg-white border-2 border-gray-100">
      <LeftSideNavbar isExpanded={isExpanded} toggleSidebar={handleToggleSidebar} />

      {/* Upload Section */}
      <div>
      <div className={`flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-10 mb-4 flex-1 transition-width duration-300 ml-${
          isExpanded ? "64" : "16"
        } p-6 mr-50 overflow-x-auto`}>
        <h1 className="text-2xl font-bold mb-6">Submit Homework</h1>
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
          onChange={handleFileInput}
          className="hidden"
        />
        {selectedFile && (
          <p className="text-green-600 mt-2">{selectedFile.name} uploaded successfully!</p>
        )}
      

      {/* Submit Button */}
      <button
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        onClick={handleSubmit}
      >
        Submit
      </button>
      {message && <p className="mt-4 text-sky-700">{message}</p>}
      </div>
    </div>
    </div>
  );
};

export default SubmitHWmainBox;