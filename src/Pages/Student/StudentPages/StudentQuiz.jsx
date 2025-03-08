// StudentQuiz.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TeacherLeftSideNavBar from '../../Teacher/Components/TeacherLeftSideNavBar';

const StudentQuiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();
//   const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const savedAuth = JSON.parse(localStorage.getItem("auth"));
   const [isExpanded, setIsExpanded] = useState(false);
      const toggleSidebar = () => {
          setIsExpanded(!isExpanded);
      };

const quiz = {
    "questions": [
      {
        "question": "Sample question?",
        "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
        "correctAnswer": "A"
      }
    ]
  }
//   useEffect(() => {cd 
//     const fetchQuiz = async () => {
//       try {
//         const response = await fetch(`http://localhost:3000/classroom/${savedAuth.id}/quizes`);
//         if (!response.ok) throw new Error('Failed to load quiz');
//         const data = await response.json();
//         setQuiz(data);
//         setAnswers(Object.fromEntries(data.questions.map((_, i) => [i, ''])));
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchQuiz();
//   }, [id]);

  const handleAnswerChange = (questionIndex, value) => {
    setAnswers({
      ...answers,
      [questionIndex]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/quiz-submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          classroomId: id,
          answers
        })
      });
      
      if (!response.ok) throw new Error('Submission failed');
      const resultData = await response.json();
      setResult(resultData);
    } catch (error) {
      setError('Submission failed. Please try again.');
    }
  };

//   if (isLoading) return <div className="text-center mt-8">Loading quiz...</div>;
//   if (error) return <div className="text-red-500 text-center mt-8">{error}</div>;
//   if (!quiz?.questions?.length) return <div className="text-center mt-8">No quiz available</div>;

  return (
    <div className="flex min-h-screen bg-gray-100">
        <TeacherLeftSideNavBar isExpanded={isExpanded} toggleSidebar={toggleSidebar} />
        <div className={`flex-1 p-8 transition-all duration-300 ${isExpanded ? 'ml-64' : 'ml-16'}`}>
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Quiz for Classroom {id}
      </h2>
      
      {result ? (
        <div className="text-center">
          <h3 className="text-xl font-medium text-green-600 mb-4">
            Your Score: {result.score}/{quiz.questions.length}
          </h3>
          <button
            onClick={() => navigate(`/classroom/${id}`)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Return to Classroom
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {quiz.questions.map((question, qIndex) => (
            <div key={qIndex} className="mb-6 p-4 border rounded-lg bg-gray-50">
              <h3 className="text-lg font-medium mb-4 text-gray-700">
                Q{qIndex + 1}: {question.question}
              </h3>
              
              <div className="space-y-2">
                {question.options.map((option, oIndex) => (
                  <label key={oIndex} className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name={`question-${qIndex}`}
                      value={String.fromCharCode(65 + oIndex)}
                      checked={answers[qIndex] === String.fromCharCode(65 + oIndex)}
                      onChange={() => handleAnswerChange(qIndex, String.fromCharCode(65 + oIndex))}
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
              disabled={Object.values(answers).some(answer => !answer)}
            >
              Submit Quiz
            </button>
          </div>
        </form>
      )}
    </div>
    </div>
    </div>
  );
};

export default StudentQuiz;