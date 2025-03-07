import React, { useState } from 'react';
import { storage } from '../../../../../firebase';
import { ref, uploadBytes } from "firebase/storage";
import EvaluationGSA from './EvaluationGSA';
import { getDownloadURL } from 'firebase/storage';

const EvaluateTestComponent = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [url, setUrl] = useState(null);
  const [message, setMessage] = useState('');
  

  const handleFileInput = async(event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    
    const refoffile = ref(storage, `temp_file`);
    await uploadBytes(refoffile, file);

    const fileRef = ref(storage, `temp_file`);
    const url = await getDownloadURL(fileRef);
    setUrl(url);
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
    <>
    <div className="p-6 bg-white border-2 rounded-lg">
      <h2 className="mb-4 text-2xl font-bold text-center ">Upload Test Paper</h2>
      <div className="justify-center p-8 border-2 border-blue-500 border-dashed rounded-lg bloc justify-items-center">
        <input
          type="file"
          accept=".pdf, .doc, .docx"
          className="content-center block p-2 mb-4 border-2"
          onChange={handleFileInput} 
        />
        <button
          onClick={handleSubmit}
          className="px-4 py-2 text-white rounded-lg bg-sky-700 hover:bg-sky-700"
        >
          Submit
        </button>
      </div>
      {message && <p className="mt-4 text-sky-700">{message}</p>}
    </div>
    { url && <div className="block">
                <EvaluationGSA url = {url}/>
              </div>
    }
    
    </>
    
  );
};

export default EvaluateTestComponent;
