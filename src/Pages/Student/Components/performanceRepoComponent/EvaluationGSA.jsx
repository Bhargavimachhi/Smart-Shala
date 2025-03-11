// EvaluationGSA.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import GenerateLoader from "../Loader";

const EvaluationGSA = (params) => {
  const [selectedTab, setSelectedTab] = useState("grammar mistakes");
  const [grammerMistakes, setGrammerMistakes] = useState("");
  const [spellingMistakes, setSpellingMistakes] = useState("");
  const [answerCorrectness, setAnswerCorrectness] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAnalysis() {
      try {
        const res = await axios.post(
          `http://localhost:3000/homework/analysis`,
          { url: params.url }
        );
        console.log(res.data);
        setGrammerMistakes(res.data.answer[0].grammer);
        setSpellingMistakes(res.data.answer[0].spelling);
        setAnswerCorrectness(res.data.answer[0].correct);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    fetchAnalysis();
  });

  if (loading) {
    return <GenerateLoader text={"Generating Report..."} />;
  }

  return (
    <>
      <h1 className="p-2 my-2 text-2xl font-semibold text-start text-text">
        Data Analysis :
      </h1>
      <hr className="border-b border-btn" />
      <div className="flex flex-col items-center justify-center w-full gap-4 p-4 sm:flex-row">
        <button
          onClick={() => setSelectedTab("grammar mistakes")}
          className={`cursor-pointer px-4 py-2 text-lg text-text rounded-lg 
             ${
               selectedTab === "grammar mistakes"
                 ? "text-white bg-btn"
                 : "text-text bg-bg border-btn border"
             }`}
        >
          Grammar Mistakes
        </button>
        <button
          onClick={() => setSelectedTab("spelling mistakes")}
          className={`cursor-pointer px-4 py-2 text-lg text-text rounded-lg
             ${
               selectedTab === "spelling mistakes"
                 ? "text-white bg-btn"
                 : "text-text bg-bg border-btn border"
             }`}
        >
          Spelling Mistakes
        </button>
        <button
          onClick={() => setSelectedTab("answer evaluation")}
          className={`cursor-pointer px-4 py-2 text-lg text-text rounded-lg 
              ${
                selectedTab === "answer evaluation"
                  ? "text-white bg-btn"
                  : "text-text bg-bg border-btn border"
              }`}
        >
          Answer Evaluation
        </button>
      </div>

      {/* Display content based on the selectedTab */}
      <div className="items-center justify-center w-full p-2 bg-gray-100 rounded-md">
        {selectedTab === "grammar mistakes" && (
          <textarea rows={10} className="w-full p-4 text-lg text-gray-700">
            {grammerMistakes}
          </textarea>
        )}
        {selectedTab === "spelling mistakes" && (
          <textarea rows={10} className="w-full p-4 text-lg text-gray-700">
            {spellingMistakes}
          </textarea>
        )}
        {selectedTab === "answer evaluation" && (
          <textarea rows={20} className="w-full p-4 text-lg text-gray-700">
            {answerCorrectness}
          </textarea>
        )}
      </div>
    </>
  );
};

export default EvaluationGSA;
