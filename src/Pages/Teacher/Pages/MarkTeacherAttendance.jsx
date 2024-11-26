import React, { useState, useRef } from 'react';
import TeacherLeftSideNavBar from '../Components/TeacherLeftSideNavBar';
import Webcam from "react-webcam";

const MarkTeacherAttendance = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState('');
  const webcamRef = useRef(null);;

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const requestCameraPermission =  () => {
    setHasPermission(true);
  };

  
  const capturePhoto = () => {
    const screenshot = webcamRef.current.getScreenshot();
    setPhoto(screenshot);
  };


  return (
    <div className="flex min-h-screen bg-gray-100">
      <TeacherLeftSideNavBar isExpanded={isExpanded} toggleSidebar={toggleSidebar} />
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold text-center mb-8">Mark Attendance</h1>
        {!hasPermission ? (
          <div className='flex flex-col items-center'>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
            onClick={requestCameraPermission}
          >
            Request Camera Permission
          </button>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/png"
              className="w-full max-w-md mb-4"
            />
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
              onClick={capturePhoto}
            >
              Capture Photo
            </button>
            {photo && (
              <div className="mt-4">
                <h2 className="text-xl font-bold mb-2">Captured Photo:</h2>
                <img src={photo} alt="Captured" className="w-full max-w-md" />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  //   <div className="flex min-h-screen bg-gray-100">
  //   <TeacherLeftSideNavBar isExpanded={isExpanded} toggleSidebar={toggleSidebar} />
  //   <div className="lex-1 flex flex-col justify-center items-center p-8">
  //     <h1 className="text-2xl font-bold mb-6">Mark Teacher Attendance</h1>
     
  //     <div className='flex flex-col items-center'>
  //       <Webcam
  //         audio={false}
  //         ref={webcamRef}
  //         screenshotFormat="image/png"
  //         className="w-full max-w-md mb-4"
  //       />
  //       <button
  //         className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
  //         onClick={capturePhoto}
  //       >
  //         Capture Photo
  //       </button>
  //       {photo && (
  //         <div className="mt-4">
  //           <h2 className="text-xl font-bold mb-2">Captured Photo:</h2>
  //           <img src={photo} alt="Captured" className="w-full max-w-md" />
  //         </div>
  //       )}
  //     </div>
  //     {error && <p className="text-red-500 mt-4">{error}</p>}
  //   </div>
  // </div>
  );
};

export default MarkTeacherAttendance;