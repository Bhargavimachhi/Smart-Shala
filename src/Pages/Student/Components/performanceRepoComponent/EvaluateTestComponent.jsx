import React, { useState } from "react";
import { storage } from "../../../../../firebase";
import { ref, uploadBytes } from "firebase/storage";
import EvaluationGSA from "./EvaluationGSA";
import { getDownloadURL } from "firebase/storage";

const EvaluateTestComponent = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [url, setUrl] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileInput = async (event) => {
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
      setMessage("Please upload a file before submitting.");
    }
  };

  return (
    <>
      <div className="p-3 bg-white border-2 rounded-lg">
        <h2 className="mb-4 text-2xl font-semibold text-start text-text">
          Upload Test Paper
        </h2>

        <div className="flex flex-col items-center justify-center p-4 space-y-4 transition-all duration-300 ease-in-out border-2 border-dashed rounded-lg border-btn sm:space-y-6">
          {/* Hidden File Input */}
          <input
            type="file"
            accept=".pdf, .doc, .docx"
            id="file-upload"
            onChange={handleFileInput}
            className="hidden"
          />

          {/* Custom Upload Button */}
          <label
            htmlFor="file-upload"
            className="flex flex-col items-center justify-center w-full max-w-xs p-6 text-white transition-all duration-300 rounded-lg shadow-md cursor-pointer bg-gradient-to-r from-sky-500 to-sky-700 hover:from-sky-600 hover:to-sky-800"
          >
            <svg
              className="w-12 h-12 mb-3 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5V19a2.003 2.003 0 002 2h14a2.003 2.003 0 002-2v-2.5M16 12l-4-4m0 0l-4 4m4-4v12"
              />
            </svg>
            <span className="text-base font-medium text-white">
              Click to Upload (.pdf, .doc, .docx)
            </span>
          </label>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full max-w-xs px-4 py-2 text-white transition-all duration-300 rounded-lg bg-sky-700 hover:bg-sky-800"
          >
            Submit
          </button>
        </div>

        {message && <p className="mt-4 text-center text-green-700">{message}</p>}
      </div>

      {url && (
        <div className="block">
          <EvaluationGSA url={url} />
        </div>
      )}
    </>
  );
};

export default EvaluateTestComponent;
