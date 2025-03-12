import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { Button, Card, Divider, Typography } from "@mui/material";
import { ICONS } from "../Icons/icons";
import TeacherLoader from "../Components/TeacherLoader";

const storage = getStorage();

const ClassroomSubmittedHomeworks = () => {
  const { id } = useParams();
  const [submittedHomeworks, setSubmittedHomeworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const savedAuth = JSON.parse(localStorage.getItem("auth"));
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubmittedHomeworks = async () => {
      try {
        // Fetch homeworks assigned by the teacher
        const teacherHomeworksRes = await axios.get(
          `http://localhost:3000/teacher/${savedAuth.id}/homeworks`
        );
        const teacherHomeworks = teacherHomeworksRes.data.homeworks.map(
          (hw) => hw._id
        );

        // Fetch submitted homeworks for the classroom
        const res = await axios.get(
          `http://localhost:3000/classroom/${id}/submitted-homeworks`
        );
        const homeworks = res.data.submittedHomeworks.filter((hw) =>
          teacherHomeworks.includes(hw.homework._id)
        );

        // Fetch file URLs for each submission
        for (const homework of homeworks) {
          for (const submission of homework.submissions) {
            const fileRef = ref(
              storage,
              `homeworks/${homework.homework._id}/${submission.studentId}`
            );
            submission.fileUrl = await getDownloadURL(fileRef);
          }
        }

        setSubmittedHomeworks(homeworks);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching submitted homeworks:", error);
        setLoading(false);
      }
    };
    fetchSubmittedHomeworks();
  }, [id, savedAuth.id]);

  if (loading) {
    return <TeacherLoader text="Loading Homeworks..." />;
  }

  return (
    <main>
      <div className="bg-white">
        {/* header */}
        <div className="flex items-center justify-between pb-3 mb-6 border-b border-btn">
          <div className="flex items-center gap-2 text-text">
            <span>
              <ICONS.CHECK_HOMEWORK size={30} />
            </span>
            <h1 className="text-lg font-semibold md:text-2xl">
              Submitted Homeworks
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
        {/* Homeworks */}
        <div className="grid grid-cols-1 gap-6 px-4 md:grid-cols-2 lg:grid-cols-3 md:px-6">
          {submittedHomeworks.map(({ homework, submissions }) => (
            <Card
              key={homework._id}
              className="relative flex flex-col justify-between h-[350px] p-4 transition-all duration-300 transform rounded-xl cursor-pointer hover:scale-[1.03] hover:shadow-xl border"
              sx={{
                background: "linear-gradient(135deg, #E0F7FA 0%, #E1F5FE 100%)",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div className="flex flex-col gap-2">
                <Typography
                  variant="h6"
                  className="!font-semibold text-btn"
                  sx={{ mb: 1 }}
                >
                  {homework.title}
                </Typography>

                <Typography
                  variant="body2"
                  className="text-text line-clamp-3"
                  sx={{ mb: 1 }}
                >
                  {homework.description}
                </Typography>

                <Typography variant="body2" className="mb-2 text-text">
                  <span className="font-medium">Due Date:</span>{" "}
                  {new Date(homework.dueDate).toLocaleDateString()}
                </Typography>

                <Divider sx={{ my: 1 }} />
              </div>

              <div className="flex flex-col">
                <Typography
                  variant="subtitle1"
                  className="mb-2 font-semibold text-indigo-900"
                >
                  Submissions
                </Typography>

                <ul className="list-disc list-inside overflow-y-auto max-h-[120px] pr-1">
                  {submissions.map((submission) => (
                    <li
                      key={submission.studentId}
                      className="mb-1 text-gray-800"
                    >
                      {submission.studentName}
                      <a
                        href={submission.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2 text-blue-700 hover:underline"
                      >
                        View File
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
};

export default ClassroomSubmittedHomeworks;
