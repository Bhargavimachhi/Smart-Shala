import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TeacherLeftSideNavBar from "../../../Teacher/Components/TeacherLeftSideNavBar";
import { useUserContext } from "../../../../context/userContext";
import Loader from "../../../InitialPages/Loader";
import axios from "axios";
import toast from "react-hot-toast";
import LeftSideNavbar from "../LeftSideNavBar";

export const AttemptQuiz = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const savedAuth = JSON.parse(localStorage.getItem("auth"));
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };
  const { userData } = useUserContext();

  const handleAnswerChange = (questionIndex, value) => {
    setAnswers({
      ...answers,
      [questionIndex]: value,
    });
  };

  const handleSubmit = async (e) => {
    let marks = 0;
    let ans = new Array(quiz.questions.length).fill(0);

    for (let i = 0; i < quiz.questions.length; i++) {
      if (answers[i] == quiz.questions[i].correctAnswer) {
        marks += quiz.questions[i].mark;
        ans[i] = answers[i];
      }
    }
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:3000/student/${savedAuth.id}/assign-marks`,
        {
          quizId: id,
          answers: ans,
          marks: marks,
        }
      );
      setResult((marks / quiz.totalMarks) * 100);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/quiz/${id}`);
        setQuiz(response.data.quiz);

        for (let i = 0; i < userData.grades.length; i++) {
          if (userData.grades[i].quizId == response.data.quiz._id) {
            setResult(userData.grades[i].percentage);
            setAnswers(userData.grades[i].answers);
            break;
          }
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [id, userData]);

  if (loading) {
    return <Loader text={"Loading Quiz"} />;
  }

  return (
    <>
      <LeftSideNavbar
        isExpanded={isExpanded}
        toggleSidebar={toggleSidebar}
      />
      <div
        className={`flex-1 p-8 transition-all duration-300 ${
          isExpanded ? "ml-64" : "ml-16"
        }`}
      >
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            {quiz.title}
          </h2>

          {result ? (
            <div className="text-center">
              <h3 className="text-xl font-medium text-green-600 mb-4">
                Your Score: {result} %
              </h3>
              {quiz?.questions?.map((question, qIndex) => (
                <div
                  key={qIndex}
                  className={`mb-6 p-4 border rounded-lg bg-${
                    question.correctAnswer == answers[qIndex] ? "green" : "red"
                  }-100`}
                >
                  <h3 className="text-lg font-medium mb-4 text-gray-700">
                    Q{qIndex + 1}: {question.question}
                  </h3>

                  <div className="space-y-2">
                    {question.options.map((option, oIndex) => (
                      <div key={oIndex}>
                        <label
                          key={oIndex}
                          className="flex items-center space-x-3"
                        >
                          <input
                            type="radio"
                            name={`question-${qIndex}`}
                            value={String.fromCharCode(65 + oIndex)}
                            checked={
                              answers[qIndex] ===
                              String.fromCharCode(65 + oIndex)
                            }
                            onChange={() =>
                              handleAnswerChange(
                                qIndex,
                                String.fromCharCode(65 + oIndex)
                              )
                            }
                            className={`form-radio`}
                            disabled
                          />
                          <span
                            className={`${
                              question.correctAnswer ==
                              String.fromCharCode(65 + oIndex)
                                ? "text-green-500 font-bold"
                                : answers[qIndex] ==
                                  String.fromCharCode(65 + oIndex)
                                ? "text-red-500 font-bold"
                                : "text-grey-700"
                            }`}
                          >
                            {String.fromCharCode(65 + oIndex)}. {option}
                          </span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {quiz?.questions?.map((question, qIndex) => (
                <div
                  key={qIndex}
                  className="mb-6 p-4 border rounded-lg bg-gray-50"
                >
                  <h3 className="text-lg font-medium mb-4 text-gray-700">
                    Q{qIndex + 1}: {question.question}
                  </h3>

                  <div className="space-y-2">
                    {question.options.map((option, oIndex) => (
                      <label
                        key={oIndex}
                        className="flex items-center space-x-3"
                      >
                        <input
                          type="radio"
                          name={`question-${qIndex}`}
                          value={String.fromCharCode(65 + oIndex)}
                          checked={
                            answers[qIndex] === String.fromCharCode(65 + oIndex)
                          }
                          onChange={() =>
                            handleAnswerChange(
                              qIndex,
                              String.fromCharCode(65 + oIndex)
                            )
                          }
                          className="form-radio text-blue-500"
                          required
                        />
                        <span className="text-gray-700">
                          {String.fromCharCode(65 + oIndex)}. {option}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}

              <div className="flex justify-end mt-8">
                <button
                  type="submit"
                  className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                  disabled={Object.values(answers).some((answer) => !answer)}
                >
                  Submit Quiz
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};
