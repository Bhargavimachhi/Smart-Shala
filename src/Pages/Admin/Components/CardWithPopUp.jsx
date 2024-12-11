import React, { useState } from "react";

const CardWithPopUp = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupText, setPopupText] = useState("");
  const [editableText, setEditableText] = useState("This is editable text.");

  const handlePhotoClick = (text) => {
    setPopupText(text);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className=" h-10 w-full  bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-4xl p-4 bg-white shadow-lg rounded-lg">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 ">
          {["Photo 1", "Photo 2", "Photo 3"].map((text, index) => (
            <div
              key={index}
              className="cursor-pointer bg-gray-200  w-12 h-12  overflow-hidden rounded-full"
              onClick={() => handlePhotoClick(text)}
            >
              <img
                src={`https://via.placeholder.com/300?text=${text}`}
                alt={text}
                className="w-full h-48 object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">{popupText}</h2>
            <textarea
              value={editableText}
              onChange={(e) => setEditableText(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg resize-none"
              rows="4"
            ></textarea>
            <button
              className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg"
              onClick={handleClosePopup}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardWithPopUp;
