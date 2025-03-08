// GenerateQuiz.jsx
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import TeacherLeftSideNavBar from '../Components/TeacherLeftSideNavBar';
const savedAuth = JSON.parse(localStorage.getItem("auth"));
const GenerateQuiz = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const toggleSidebar = () => {
        setIsExpanded(!isExpanded);
    };

  const { id } = useParams();
  const [questions, setQuestions] = useState([
    {
      question: '',
      options: ['', '', '', ''],
      correctAnswer: ''
    }
  ]);

  const handleQuestionChange = (index, e) => {
    const newQuestions = [...questions];
    newQuestions[index].question = e.target.value;
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
        question: '',
        options: ['', '', '', ''],
        correctAnswer: ''
      }
    ]);
  };

  const handleDeleteQuestion = (index) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`http://localhost:3000/classroom/${savedAuth}/create-quiz`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          classroomId: id,
          questions
        })
      });
      
      if (response.ok) {
        alert('Quiz created successfully!');
        setQuestions([
          {
            question: '',
            options: ['', '', '', ''],
            correctAnswer: ''
          }
        ]);
      }
    } catch (error) {
      console.error('Error creating quiz:', error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
        <TeacherLeftSideNavBar isExpanded={isExpanded} toggleSidebar={toggleSidebar} />
        <div className={`flex-1 p-8 transition-all duration-300 ${isExpanded ? 'ml-64' : 'ml-16'}`}>
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Create Quiz for Classroom {id}
      </h2>
      
      <form onSubmit={handleSubmit}>
        {questions.map((q, qIndex) => (
          <div key={qIndex} className="mb-6 p-4 border rounded-lg bg-gray-50">
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Question {qIndex + 1}
              </label>
              <input
                type="text"
                value={q.question}
                onChange={(e) => handleQuestionChange(qIndex, e)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              {q.options.map((option, oIndex) => (
                <div key={oIndex}>
                  <label className="block text-gray-600 mb-1">
                    Option {String.fromCharCode(65 + oIndex)}
                  </label>
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => handleOptionChange(qIndex, oIndex, e)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              ))}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Correct Answer
              </label>
              <select
                value={q.correctAnswer}
                onChange={(e) => handleCorrectAnswerChange(qIndex, e)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Correct Answer</option>
                {q.options.map((_, oIndex) => (
                  <option key={oIndex} value={String.fromCharCode(65 + oIndex)}>
                    Option {String.fromCharCode(65 + oIndex)}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              onClick={() => handleDeleteQuestion(qIndex)}
              className="text-red-500 hover:text-red-700 font-medium"
            >
              Delete Question
            </button>
          </div>
        ))}

        <div className="flex justify-between items-center mt-8">
          <button
            type="button"
            onClick={handleAddQuestion}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Add Question
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          >
            Submit Quiz
          </button>
        </div>
      </form>
    </div>
    </div>
    </div>
  );
};

export default GenerateQuiz;