// StudentQuiz.jsx
import { useState, useEffect } from "react";
import { useUserContext } from "../../../context/userContext";
import axios from "axios";
import Loader from "../../InitialPages/Loader";
import { AttemptQuiz } from "../Components/attemptQuiz/attemptQuiz.jsx";
import LeftSideNavbar from "../Components/LeftSideNavBar.jsx";
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

const StudentQuizResults = () => {
  const [result, setResult] = useState([]);
  // const [filteredQuizzes, setFilteredQuizzes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const savedAuth = JSON.parse(localStorage.getItem("auth"));
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const { userData } = useUserContext();

  const [isExpanded, setIsExpanded] = useState(false);
  const handleToggleSidebar = () => {
    setIsExpanded((prevState) => !prevState);
  };

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/student/${savedAuth.id}/quizzes-result`
        );
        setResult(response.data.result);
        console.log(response);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchQuiz();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredResult = result.filter((result) =>
    result.quiz.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <Loader text={"Loading Quizzes..."} />;
  }

  return (
    <>
      <div className="flex min-h-screen bg-gray-100">
        <LeftSideNavbar
          isExpanded={isExpanded}
          toggleSidebar={handleToggleSidebar}
        />
        <div
          className={`flex-1 transition-all duration-300 ${
            isExpanded ? "ml-56" : "ml-16"
          } p-6 mr-50 overflow-x-auto`}
        >
          <div className="flex items-center justify-between mb-6">
            <h1 className="mb-2 text-2xl font-bold">Your Results</h1>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ marginTop: 2 }}
              onClick={() => {
                navigate('/student/quizzes')
              }}
            >
              View All Quizzes
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

          {filteredResult?.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredResult.map((result) => {
                return (
                  <Card
                    className="relative h-48 mb-8 cursor-pointer hover-card"
                    key={result.quiz._id}
                    onClick={() => {
                      navigate(`/student/attempt-quiz/${result.quiz._id}`);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <CardContent className="relative flex flex-col items-center justify-center h-full">
                      <Typography
                        variant="h5"
                        className="font-bold text-center text-blue-600"
                      >
                        {result.quiz.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        className="mt-2 text-center text-gray-600"
                      >
                        {result.quiz.questions.length} Questions
                      </Typography>
                      <Typography
                        variant="body2"
                        className="mt-2 text-center text-gray-600"
                      >
                        Total Marks : {result.quiz.totalMarks}
                      </Typography>
                      <Typography
                        variant="body2"
                        className="mt-2 text-center text-green-600"
                      >
                        Your Marks : {(result.percentage * result.quiz.totalMarks)/100}
                      </Typography>
                      <Typography
                        variant="body2"
                        className="mt-2 text-center text-green-600"
                      >
                        Percentage : {result.percentage} % 
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

export default StudentQuizResults;
