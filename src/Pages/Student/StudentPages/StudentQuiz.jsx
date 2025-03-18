// StudentQuiz.jsx
import { useState, useEffect } from "react";
import { useUserContext } from "../../../context/userContext";
import axios from "axios";
import Loader from "../../InitialPages/Loader";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Button,
  TextField,
  InputAdornment,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const StudentQuiz = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const { userData } = useUserContext();

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/classroom/${userData?.classroom}/quizes`
        );
        setQuizzes(response.data.quizes);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchQuiz();
  }, [userData]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredQuizzes = quizzes.filter((quiz) =>
    quiz.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <Loader text={"Loading Quizzes..."} />;
  }

  return (
    <>
      <div className="flex min-h-screen bg-gray-100">
        <div
          className={`flex-1 transition-all duration-300 p-6 mr-50 overflow-x-auto`}
        >
          <div className="flex items-center justify-between mb-6">
            <h1 className="mb-2 text-2xl font-bold">Your Quizes</h1>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ marginTop: 2 }}
              onClick={() => {
                navigate('/student/quiz-results')
              }}
            >
              Check Your Results
            </Button>
          </div>

          <TextField
            label="Search Quizzes"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={handleSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            sx={{ marginBottom: 4 }}
          />

          {filteredQuizzes?.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredQuizzes.map((quiz) => {
                return (
                  <Card
                    className="relative h-48 mb-8 cursor-pointer hover-card"
                    key={quiz._id}
                    onClick={() => {
                      navigate(`/student/attempt-quiz/${quiz._id}`);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <CardContent className="relative flex flex-col items-center justify-center h-full">
                      <Typography
                        variant="h5"
                        className="font-bold text-center text-blue-600"
                      >
                        {quiz.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        className="mt-2 text-center text-gray-600"
                      >
                        {quiz.questions.length} Questions
                      </Typography>
                    </CardContent>
                    <div className="absolute top-2 right-2">
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation(); /* Add edit/delete functionality here */
                        }}
                      >
                        {/* <MoreVertical /> */}
                      </IconButton>
                    </div>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="mt-8 text-center">
              <p className="text-gray-500">No quizzes available.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default StudentQuiz;
