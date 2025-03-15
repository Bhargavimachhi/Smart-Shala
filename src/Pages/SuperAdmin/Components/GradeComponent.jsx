import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, CheckCircle, FileQuestion } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useMemo } from "react";

export const GradeComponent = ({ student }) => {
  const averageOfGrades =
    student.grades.length == 0
      ? 0
      : student.grades
          .map((obj) => obj.percentage)
          .reduce((sum, val) => sum + val, 0) / student.grades.length;

  const gradeDetails = useMemo(() => {
    // Create a map of months with present and absent counts
    let quizzes = {};

    for(let i=0; i<student.grades.length; i++) {
        quizzes[`Quiz ${i+1}`] = {quizName : `Quiz ${i+1}`, percentage:student.grades[i].percentage};
    }

    return Object.values(quizzes);
  }, [student]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Average of Quiz Marks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-2" />
              <div className="text-2xl font-bold">{averageOfGrades}%</div>
            </div>

            <div className="mt-1 h-2 w-full rounded-full bg-muted">
              <div
                className="h-2 rounded-full bg-green-500"
                style={{ width: `${averageOfGrades}%` }}
              />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              No Of Quizzes Attempted
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex">
              <FileQuestion className="h-5 w-5 text-yellow-500 mr-2 mt-2" />
              <div className="text-2xl font-bold">
                {student?.grades?.length}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Monthly Attendance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={gradeDetails}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="quizName" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="percentage"
                  stroke="#10b981"
                  activeDot={{ r: 8 }}
                  name="Obtained Percentage"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
