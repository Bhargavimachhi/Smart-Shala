import React, { useState } from 'react';

const EvaluateTestComponent = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileInput = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setMessage('File uploaded successfully!');
    } else {
      setMessage('No file selected. Please try again.');
    }
  };

  const handleSubmit = () => {
    if (selectedFile) {
      setMessage(`"${selectedFile.name}" submitted successfully!`);
      // Add API call or submission logic here
      setSelectedFile(null);
    } else {
      setMessage('Please upload a file before submitting.');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg  ">
      <h2 className="text-2xl font-bold mb-4 text-center text-sky-700">Upload Test Paper</h2>
      <div className="border-2 border-dashed bloc border-sky-700 p-10 rounded-lg justify-center justify-items-center">
        <input
          type="file"
          accept=".pdf, .doc, .docx"
          className="mb-4 block content-center p-2 border-2"
          onChange={handleFileInput} 
        />
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-sky-700 text-white rounded-lg hover:bg-sky-700"
        >
          Submit
        </button>
      </div>
      {message && <p className="mt-4 text-sky-700">{message}</p>}
    </div>
  );
};

export default EvaluateTestComponent;
