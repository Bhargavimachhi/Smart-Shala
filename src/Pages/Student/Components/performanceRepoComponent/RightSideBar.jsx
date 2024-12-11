import React from 'react';
import { useNavigate } from 'react-router-dom';

const RightSideBar = ({ uploadedFiles }) => {
  const navigate = useNavigate();

  const handleFileClick = (fileId) => {
    navigate(`/file-preview/${fileId}`);
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen shadow-lg">
      <h2 className="text-2xl font-bold mb-4">History</h2>
      <ul className="space-y-2">
        {uploadedFiles.map((file, index) => {
          // Extract only the file name from the full path
          const fileName = file.name.split('/').pop();
          return (
            <li
              key={index}
              onClick={() => handleFileClick(file.id)}
              className="cursor-pointer px-4 py-2 bg-white rounded-lg shadow hover:bg-gray-200"
            >
              {fileName}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RightSideBar;
