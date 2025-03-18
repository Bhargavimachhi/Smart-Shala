import React, { useEffect, useState } from 'react';
import FilePreviewComponent from './FilePreviewComponent';
import LeftSideNavbar from '../LeftSideNavBar';
import EvaluationGSA from './EvaluationGSA';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../../../../firebase";
import axios from 'axios';

const FilePreviewMain = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState('');
  const [urlOfTeacherFile, setUrlOfTeacherfile] = useState('');
  const [homework, setHomework] = useState('');
  const { id } = useParams();
  const savedAuth = JSON.parse(localStorage.getItem("auth"));

  const handleToggleSidebar = () => {
    setIsExpanded((prevState) => !prevState);
  };

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
        console.error('Error fetching file:', error);
      }
    }

    async function fetchTeacherFile() {
      const fileRef = ref(storage, `/homeworks/${id}/teachersfile`);
      try {
        const url = await getDownloadURL(fileRef);
        setUrlOfTeacherfile(url);
        setLoading(false);
      } catch (error) {
        console.error('File not found');
      }
    }

    fetchHomework();
    fetchFile();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-screen bg-gray-100">Loading...</div>;
  }

  return (
    <div className="flex h-screen bg-gray-100 pr-14 ">
      {/* Sidebar */}
      <LeftSideNavbar isExpanded={isExpanded} handleToggleSidebar={handleToggleSidebar} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden p-6">
        {/* Header */}
        <header className="bg-white shadow-md p-4 mb-6">
          <h1 className="text-xl font-semibold text-gray-800"> Preview Your Work</h1>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto space-y-6">
          {/* File Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Student File Section */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className='h-10 w-10 text-red-500 mr-2' x="0px" y="0px" width="40" height="40" viewBox="0 0 16 16">
<path d="M 4.5 2 C 3.675781 2 3 2.675781 3 3.5 L 3 12.5 C 3 13.324219 3.675781 14 4.5 14 L 11.5 14 C 12.324219 14 13 13.324219 13 12.5 L 13 5.292969 L 9.707031 2 Z M 4.5 3 L 9 3 L 9 6 L 12 6 L 12 12.5 C 12 12.78125 11.78125 13 11.5 13 L 4.5 13 C 4.21875 13 4 12.78125 4 12.5 L 4 3.5 C 4 3.21875 4.21875 3 4.5 3 Z M 10 3.707031 L 11.292969 5 L 10 5 Z"></path>
</svg>
                <h2 className="text-lg font-medium text-gray-700">Your Submission</h2>
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
              <svg xmlns="http://www.w3.org/2000/svg" className='h-10 w-10 text-red-500 mr-2' x="0px" y="0px" width="44" height="44" viewBox="0 0 16 16">
<path d="M 4.5 2 C 3.675781 2 3 2.675781 3 3.5 L 3 12.5 C 3 13.324219 3.675781 14 4.5 14 L 11.5 14 C 12.324219 14 13 13.324219 13 12.5 L 13 5.292969 L 9.707031 2 Z M 4.5 3 L 9 3 L 9 6 L 12 6 L 12 12.5 C 12 12.78125 11.78125 13 11.5 13 L 4.5 13 C 4.21875 13 4 12.78125 4 12.5 L 4 3.5 C 4 3.21875 4.21875 3 4.5 3 Z M 10 3.707031 L 11.292969 5 L 10 5 Z"></path>
</svg>
                <h2 className="text-lg font-medium text-gray-700">Teacher's File</h2>
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
            <h2 className="text-lg font-medium text-gray-700 mb-4">Evaluation</h2>
            {/* <EvaluationGSA url={url} /> */}
          </div>
        </main>
      </div>
    </div>
  );
};

export default FilePreviewMain;