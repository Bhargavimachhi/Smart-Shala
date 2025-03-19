import React, { useEffect, useState } from "react";
import EvaluationGSA from "./EvaluationGSA";
import { useParams } from "react-router-dom";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../../../../firebase";
import axios from "axios";
import { File } from "lucide-react";
import Loader from "@/Pages/InitialPages/Loader";

const FilePreviewMain = () => {
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState("");
  const [urlOfTeacherFile, setUrlOfTeacherfile] = useState("");
  const [homework, setHomework] = useState("");
  const { id } = useParams();
  const savedAuth = JSON.parse(localStorage.getItem("auth"));

  useEffect(() => {
    async function fetchHomework() {
      try {
        const res = await axios.get(`http://localhost:3000/homework/${id}`);
        setHomework(res.data.homework);
      } catch (err) {
        console.log(err);
      }
    }

    async function fetchFile() {
      const fileRef = ref(storage, `/homeworks/${id}/${savedAuth.id}`);
      try {
        const url = await getDownloadURL(fileRef);
        setUrl(url);
        fetchTeacherFile();
      } catch (error) {
        console.error("Error fetching file:", error);
      }
    }

    async function fetchTeacherFile() {
      const fileRef = ref(storage, `/homeworks/${id}/teachersfile`);
      try {
        const url = await getDownloadURL(fileRef);
        setUrlOfTeacherfile(url);
        setLoading(false);
      } catch (error) {
        console.error("File not found");
      }
    }

    fetchHomework();
    fetchFile();
  }, []);

  if (loading) {
    return <Loader text="Loading ..." />;
  }

  return (
    <div className="flex h-screen bg-gray-100 pr-14 ">
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden p-6">
        {/* Header */}
        <header className="bg-white shadow-md p-4 mb-6">
          <h1 className="text-xl font-semibold text-gray-800">
            {" "}
            Preview Your Work
          </h1>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto space-y-6">
          {/* File Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Student File Section */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <File className="mr-5" size={40} />
                <h2 className="text-lg font-medium text-gray-700">
                  Your Submission
                </h2>
              </div>
              <p className="text-gray-600">Student File</p>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 font-medium mt-1 inline-block"
              >
                View File
              </a>
            </div>

            {/* Teacher File Section */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <File className="mr-5" size={40} />
                <h2 className="text-lg font-medium text-gray-700">
                  Teacher's File
                </h2>
              </div>
              <p className="text-gray-600">Teacher File</p>
              <a
                href={urlOfTeacherFile}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 font-medium mt-1 inline-block"
              >
                View File
              </a>
            </div>
          </div>

          {/* Evaluation Section */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-lg font-medium text-gray-700 mb-4">
              Evaluation
            </h2>
            <EvaluationGSA url={url} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default FilePreviewMain;
