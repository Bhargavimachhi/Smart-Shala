import React, { useState } from 'react';
import { storage } from '../../../../../firebase';
import { ref, uploadBytes } from "firebase/storage";

const EvaluateTestComponent = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileInput = async(event) => {
    const file = event.target.files[0];
    
    const refoffile = ref(storage, `temp_file`);
    await uploadBytes(refoffile, file);

    const fileRef = ref(storage, `temp_file`);
    const url = await getDownloadURL(fileRef);

    const res = await axios.get(`http//localhost:3000/homework/analysis`, {url});
    console.log(res.data);
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
    <div className="bg-white p-6 rounded-lg border-2 border-2">
      <h2 className="text-2xl font-bold mb-4">Upload Test Paper</h2>
      <div className="border-2 border-dashed bloc border-blue-500 p-8 rounded-lg justify-center justify-items-center">
        <input
          type="file"
          accept=".pdf, .doc, .docx"
          className="mb-4 block content-center p-2 bg-blue-500"
          onChange={handleFileInput} 
        />
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Submit
        </button>
      </div>
      {message && <p className="mt-4 text-blue-600">{message}</p>}
    </div>
  );
};

export default EvaluateTestComponent;
