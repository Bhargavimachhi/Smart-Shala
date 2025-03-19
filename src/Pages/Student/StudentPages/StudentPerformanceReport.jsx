import React, { useState, useEffect } from "react";
import PerfComMain from "../Components/performanceRepoComponent/PerfComMain";
import EvaluateTestComponent from "../Components/performanceRepoComponent/EvaluateTestComponent";
import axios from "axios";
import History from "../Components/performanceRepoComponent/History";

const StudentPerformanceReport = () => {
  const [submittedHomework, setSubmittedHomework] = useState([]);
  const [activeTab, setActiveTab] = useState("evaluate test");
  const savedAuth = JSON.parse(localStorage.getItem("auth"));

  useEffect(() => {
    async function fetchStudent() {
      const res = await axios.get(
        `http://localhost:3000/student/${savedAuth.id}`
      );
      setSubmittedHomework(res.data.student.submittedHomeworks);
    }
    fetchStudent();
  }, []);

  return (
    <div
      className={`relative w-full ${
        activeTab === "evaluate test" ? "block" : ""
      }`}
    >
      <div
        className={`flex-grow p-2 ${
          activeTab === "evaluate test" ? "w-full" : "w-full"
        }`}
      >
        <PerfComMain activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="mt-6">
          {activeTab === "evaluate test" && <EvaluateTestComponent />}

          {activeTab === "overall performance" && (
            <h2 className="text-xl text-center">Overall Performance Section</h2>
          )}

          {activeTab === "test results" && (
            <h2 className="text-xl text-center">Test Results Section</h2>
          )}
        </div>
      </div>
      <div className="block"></div>

      {activeTab === "evaluate test" && (
        <div className="absolute top-[30px] right-[10px]">
          <History uploadedFiles={submittedHomework} />
        </div>
      )}
    </div>
  );
};

export default StudentPerformanceReport;
