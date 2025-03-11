import React, { useEffect, useState } from "react";
import { ICONS } from "../Icons/icons";
import {
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import SuperAdminLoader from "../Components/SuperAdminLoader";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const ClassroomSuperAnalytics = () => {
  const { classroomId } = useParams();
  const navigate = useNavigate();
  const [attendance, setAttendance] = useState(null);
  const [topPerformers, setTopPerformers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClassroomData = async () => {
      setLoading(true);
      try {
        const attendanceRes = await axios.get(
          `http://localhost:3000/classroom/${classroomId}/attendance`
        );
        const performersRes = await axios.get(
          `http://localhost:3000/classroom/${classroomId}/top-performers`
        );
        setAttendance(attendanceRes.data.average);
        setTopPerformers(performersRes.data.topPerformers);
      } catch (error) {
        console.error("Error fetching classroom data:", error);
      }
      setLoading(false);
    };
    fetchClassroomData();
  }, [classroomId]);

  if (loading) {
    return <SuperAdminLoader text={"Loading Data..."} />;
  }

  const attendanceData = [
    { name: "Present", value: attendance },
    { name: "Absent", value: 100 - attendance },
  ];

  return (
    <main>
      <div className="bg-white">
        <div className="flex items-center justify-between pb-3 mb-6 border-b border-btn">
          <div className="flex items-center gap-2 text-text">
            <span>
              <ICONS.DATA_ANALYTICS size={30} />
            </span>
            <h1 className="text-lg font-semibold md:text-2xl">
              Classroom Analytics
            </h1>
          </div>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className="flex items-center justify-between gap-2"
            onClick={() => navigate(-1)}
          >
            <span>
              <ICONS.BACK size={20} />
            </span>
            <span>Back</span>
          </Button>
        </div>
        <div className="grid grid-rows-2 gap-2 p-3 md:grid-cols-12 md:grid-rows-1">
          <Card className="md:col-span-6">
            <CardContent>
              <Typography variant="h6" component="div">
                Average Attendance
              </Typography>
              <hr className="my-2 border-b border-btn" />
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={attendanceData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    label
                  >
                    {attendanceData?.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card className="md:col-span-6">
            <CardContent>
              <Typography variant="h6" component="div">
                Top Performers
              </Typography>
              <hr className="my-2 border-b border-btn" />
              <div className="">
                {topPerformers.map((student, index) => (
                  <List key={index}>
                    <ListItem className="flex gap-2">
                      <span>{index + 1}.</span>
                      <span>
                        {student?.name} - {student?.grades[0]?.percentage} %
                      </span>
                    </ListItem>
                  </List>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default ClassroomSuperAnalytics;
