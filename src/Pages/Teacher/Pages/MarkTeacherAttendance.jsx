import React, { useState, useRef } from 'react';
import TeacherLeftSideNavBar from '../Components/TeacherLeftSideNavBar';

const MarkTeacherAttendance = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState('');
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const requestCameraPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      setHasPermission(true);
      setError('');
    } catch (err) {
      console.error('Error accessing camera:', err);
      setError('Failed to access camera. Please check your browser settings and ensure the site is served over HTTPS.');
    }
  };

  const capturePhoto = () => {
    const context = canvasRef.current.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
    const dataUrl = canvasRef.current.toDataURL('image/png');
    setPhoto(dataUrl);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <TeacherLeftSideNavBar isExpanded={isExpanded} toggleSidebar={toggleSidebar} />
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold text-center mb-8">Mark Attendance</h1>
        {!hasPermission ? (
          <div className="text-center">
            <button
              onClick={requestCameraPermission}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Allow Camera Access
            </button>
            {error && <p className="text-red-500 mt-4">{error}</p>}
          </div>
        ) : (
          <div className="text-center">
            <video ref={videoRef} autoPlay className="mx-auto mb-4"></video>
            <canvas ref={canvasRef} width="640" height="480" className="hidden"></canvas>
            <button
              onClick={capturePhoto}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Capture Photo
            </button>
            {photo && (
              <div className="mt-4">
                <h2 className="text-lg font-bold mb-2">Captured Photo:</h2>
                <img src={photo} alt="Captured" className="mx-auto" />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MarkTeacherAttendance;