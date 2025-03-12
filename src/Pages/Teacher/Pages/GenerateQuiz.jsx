import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { ICONS } from "../Icons/icons";
import { Button } from "@mui/material";

const GenerateQuiz = () => {
  const savedAuth = JSON.parse(localStorage.getItem("auth"));
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([
    {
      question: "",
      mark: 0,
      options: ["", "", "", ""],
      correctAnswer: "",
    },
  ]);
  const navigate = useNavigate();

  const handleQuestionChange = (index, e) => {
    const newQuestions = [...questions];
    newQuestions[index].question = e.target.value;
    setQuestions(newQuestions);
  };

  const handleMarkChange = (index, e) => {
    const newQuestions = [...questions];
    newQuestions[index].mark = e.target.value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (qIndex, oIndex, e) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[oIndex] = e.target.value;
    setQuestions(newQuestions);
  };

  const handleCorrectAnswerChange = (index, e) => {
    const newQuestions = [...questions];
    newQuestions[index].correctAnswer = e.target.value;
    setQuestions(newQuestions);
  };

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        question: "",
        mark: 0,
        options: ["", "", "", ""],
        correctAnswer: "",
      },
    ]);
  };

  const handleDeleteQuestion = (index) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
  };

  const handleSubmit = async (e) => {
    let totalMarks = 0;
    await Promise.all(
      questions.map((question) => {
        totalMarks += Number(question.mark);
      })
    );
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:3000/classroom/${id}/create-quiz`,
        {
          questions: questions,
          createdBy: savedAuth.id,
          classroom: id,
          title: title,
          totalMarks: totalMarks,
        }
      );

      if (response.status == 200) {
        toast.success("Quiz created successfully!");
        setQuestions([
          {
            question: "",
            options: ["", "", "", ""],
            correctAnswer: "",
          },
        ]);
      }
    } catch (error) {
      toast.error("Something went Wrong !");
    }
  };

  return (
    <main>
      <div className="bg-white">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 mb-6 border-b border-btn">
          <div className="flex items-center gap-2 text-text">
            <span>
              <ICONS.QUIZ size={30} />
            </span>
            <h1 className="font-semibold md:text-2xl">
              Create Quiz for Classroom
            </h1>
          </div>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            onClick={() => navigate(-1)}
          >
            <span>
              <ICONS.BACK size={20} />
            </span>
            <span>Back</span>
          </Button>
        </div>
        <div className="p-4 mx-auto bg-white shadow-lg rounded-xl max-w-7xl">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Quiz Title */}
            <div className="w-full">
              <label className="block mb-2 text-lg font-semibold text-sky-800">
                Name of Quiz
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 transition border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                placeholder="Enter quiz title"
                required
              />
            </div>

            {/* Questions Section */}
            {questions.map((q, qIndex) => (
              <div
                key={qIndex}
                className="p-6 space-y-6 transition border border-gray-200 rounded-lg shadow-sm bg-gradient-to-br from-blue-50 to-white hover:shadow-md"
              >
                {/* Question Header */}
                <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                  <div className="flex-1">
                    <label className="block mb-2 font-medium text-gray-700">
                      Question {qIndex + 1}
                    </label>
                    <input
                      type="text"
                      value={q.question}
                      onChange={(e) => handleQuestionChange(qIndex, e)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                      placeholder="Enter your question"
                      required
                    />
                  </div>

                  {/* Marks Input */}
                  <div className="w-full md:w-[120px] md:ml-6">
                    <label className="block mb-2 font-medium text-gray-700">
                      Mark
                    </label>
                    <input
                      type="number"
                      value={q.mark}
                      onChange={(e) => handleMarkChange(qIndex, e)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                      placeholder="0"
                      required
                    />
                  </div>
                </div>

                {/* Options Inputs */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {q.options.map((option, oIndex) => (
                    <div key={oIndex}>
                      <label className="block mb-1 text-gray-600">
                        Option {String.fromCharCode(65 + oIndex)}
                      </label>
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => handleOptionChange(qIndex, oIndex, e)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                        placeholder={`Enter option ${String.fromCharCode(
                          65 + oIndex
                        )}`}
                        required
                      />
                    </div>
                  ))}
                </div>

                {/* Correct Answer Selector */}
                <div>
                  <label className="block mb-2 font-medium text-gray-700">
                    Correct Answer
                  </label>
                  <select
                    value={q.correctAnswer}
                    onChange={(e) => handleCorrectAnswerChange(qIndex, e)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                    required
                  >
                    <option value="">Select Correct Answer</option>
                    {q.options.map((_, oIndex) => (
                      <option
                        key={oIndex}
                        value={String.fromCharCode(65 + oIndex)}
                      >
                        Option {String.fromCharCode(65 + oIndex)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Delete Button */}
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => handleDeleteQuestion(qIndex)}
                    className="px-4 py-2 text-sm font-medium text-red-600 transition border border-red-200 rounded-lg bg-red-50 hover:bg-red-100 hover:text-red-800"
                  >
                    Delete Question
                  </button>
                </div>
              </div>
            ))}

            {/* Add Question & Submit Buttons */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <button
                type="button"
                onClick={handleAddQuestion}
                className="w-full px-6 py-3 font-semibold text-white transition rounded-lg shadow md:w-auto bg-sky-600 hover:bg-sky-700"
              >
                Add Question
              </button>
              <button
                type="submit"
                className="w-full px-8 py-3 font-semibold text-white transition bg-green-600 rounded-lg shadow md:w-auto hover:bg-green-700"
              >
                Submit Quiz
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default GenerateQuiz;
