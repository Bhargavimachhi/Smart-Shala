

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
 const schoolsData = [
    {
      _id: "school_1",
      name: "School A",
      email: "school1@education.gov",
      students: Array.from({ length: 500 }, (_, i) => `student_${i + 1}`),
      teachers: Array.from({ length: 20 }, (_, i) => `teacher_${i + 1}`),
      classrooms: Array.from({ length: 10 }, (_, i) => `classroom_${i + 1}`),
      resources: Array.from({ length: 10 }, (_, i) => `resource_${i + 1}`),
      requests: Array.from({ length: 5 }, (_, i) => `request_${i + 1}`),
      absentDays: 5,
      presentDays: 195,
      performance: {
        grade: "A+",
        passPercentage: 95,
      },
    },
    {
      _id: "school_2",
      name: "School B ",
      email: "school2@education.gov",
      students: Array.from({ length: 600 }, (_, i) => `student_${i + 1}`),
      teachers: Array.from({ length: 25 }, (_, i) => `teacher_${i + 1}`),
      classrooms: Array.from({ length: 12 }, (_, i) => `classroom_${i + 1}`),
      resources: Array.from({ length: 10 }, (_, i) => `resource_${i + 1}`),
      requests: Array.from({ length: 5 }, (_, i) => `request_${i + 1}`),
      absentDays: 8,
      presentDays: 192,
      performance: {
        grade: "A",
        passPercentage: 90,
      },
    },
    {
      _id: "school_3",
      name: "School C",
      email: "school3@education.gov",
      students: Array.from({ length: 550 }, (_, i) => `student_${i + 1}`),
      teachers: Array.from({ length: 22 }, (_, i) => `teacher_${i + 1}`),
      classrooms: Array.from({ length: 11 }, (_, i) => `classroom_${i + 1}`),
      resources: Array.from({ length: 10 }, (_, i) => `resource_${i + 1}`),
      requests: Array.from({ length: 5 }, (_, i) => `request_${i + 1}`),
      absentDays: 7,
      presentDays: 193,
      performance: {
        grade: "B+",
        passPercentage: 85,
      },
    },
    {
      _id: "school_4",
      name: "Schhold D",
      email: "school4@education.gov",
      students: Array.from({ length: 700 }, (_, i) => `student_${i + 1}`),
      teachers: Array.from({ length: 30 }, (_, i) => `teacher_${i + 1}`),
      classrooms: Array.from({ length: 15 }, (_, i) => `classroom_${i + 1}`),
      resources: Array.from({ length: 10 }, (_, i) => `resource_${i + 1}`),
      requests: Array.from({ length: 5 }, (_, i) => `request_${i + 1}`),
      absentDays: 10,
      presentDays: 190,
      performance: {
        grade: "B",
        passPercentage: 80,
      },
    },
    {
      _id: "school_5",
      name: "School E",
      email: "school5@education.gov",
      students: Array.from({ length: 650 }, (_, i) => `student_${i + 1}`),
      teachers: Array.from({ length: 28 }, (_, i) => `teacher_${i + 1}`),
      classrooms: Array.from({ length: 14 }, (_, i) => `classroom_${i + 1}`),
      resources: Array.from({ length: 10 }, (_, i) => `resource_${i + 1}`),
      requests: Array.from({ length: 5 }, (_, i) => `request_${i + 1}`),
      absentDays: 6,
      presentDays: 194,
      performance: {
        grade: "C+",
        passPercentage: 75,
      },
    },
    {
      _id: "school_6",
      name: "School F",
      email: "school6@education.gov",
      students: Array.from({ length: 500 }, (_, i) => `student_${i + 1}`),
      teachers: Array.from({ length: 20 }, (_, i) => `teacher_${i + 1}`),
      classrooms: Array.from({ length: 10 }, (_, i) => `classroom_${i + 1}`),
      resources: Array.from({ length: 10 }, (_, i) => `resource_${i + 1}`),
      requests: Array.from({ length: 5 }, (_, i) => `request_${i + 1}`),
      absentDays: 9,
      presentDays: 191,
      performance: {
        grade: "C",
        passPercentage: 70,
      },
    },
    {
      _id: "school_7",
      name: "School G",
      email: "school7@education.gov",
      students: Array.from({ length: 600 }, (_, i) => `student_${i + 1}`),
      teachers: Array.from({ length: 25 }, (_, i) => `teacher_${i + 1}`),
      classrooms: Array.from({ length: 12 }, (_, i) => `classroom_${i + 1}`),
      resources: Array.from({ length: 10 }, (_, i) => `resource_${i + 1}`),
      requests: Array.from({ length: 5 }, (_, i) => `request_${i + 1}`),
      absentDays: 8,
      presentDays: 192,
      performance: {
        grade: "D",
        passPercentage: 65,
      },
    },
    {
      _id: "school_8",
      name: "School H",
      email: "school8@education.gov",
      students: Array.from({ length: 550 }, (_, i) => `student_${i + 1}`),
      teachers: Array.from({ length: 22 }, (_, i) => `teacher_${i + 1}`),
      classrooms: Array.from({ length: 11 }, (_, i) => `classroom_${i + 1}`),
      resources: Array.from({ length: 10 }, (_, i) => `resource_${i + 1}`),
      requests: Array.from({ length: 5 }, (_, i) => `request_${i + 1}`),
      absentDays: 7,
      presentDays: 193,
      performance: {
        grade: "F",
        passPercentage: 60,
      },
    },
    {
      _id: "school_9",
      name: "School I",
      email: "school9@education.gov",
      students: Array.from({ length: 700 }, (_, i) => `student_${i + 1}`),
      teachers: Array.from({ length: 30 }, (_, i) => `teacher_${i + 1}`),
      classrooms: Array.from({ length: 15 }, (_, i) => `classroom_${i + 1}`),
      resources: Array.from({ length: 10 }, (_, i) => `resource_${i + 1}`),
      requests: Array.from({ length: 5 }, (_, i) => `request_${i + 1}`),
      absentDays: 10,
      presentDays: 190,
      performance: {
        grade: "A+",
        passPercentage: 95,
      },
    },
    {
      _id: "school_10",
      name: "School J",
      email: "school10@education.gov",
      students: Array.from({ length: 650 }, (_, i) => `student_${i + 1}`),
      teachers: Array.from({ length: 28 }, (_, i) => `teacher_${i + 1}`),
      classrooms: Array.from({ length: 14 }, (_, i) => `classroom_${i + 1}`),
      resources: Array.from({ length: 10 }, (_, i) => `resource_${i + 1}`),
      requests: Array.from({ length: 5 }, (_, i) => `request_${i + 1}`),
      absentDays: 6,
      presentDays: 194,
      performance: {
        grade: "A",
        passPercentage: 90,
      },
    },
  ];



const getTopAndBottomSchools = () => {
  const sortedSchools = [...schoolsData].sort((a, b) => {
    const gradeOrder = { "A+": 0, A: 1, "B+": 2, B: 3, "C+": 4, C: 5, D: 6, F: 7 };
    return (
      gradeOrder[a.performance.grade ] -
      gradeOrder[b.performance.grade]
    );
  });

  const topSchools = sortedSchools.slice(0, 5);
  const bottomSchools = sortedSchools.slice(-5);

  return { topSchools, bottomSchools };
};

export function PerformanceChart() {
  const { topSchools, bottomSchools } = getTopAndBottomSchools();

  const chartData = [
    ...topSchools.map((school) => ({
      name: school.name, // Just use the last word of the name for brevity
      passPercentage: school.performance.passPercentage,
      grade: school.performance.grade,
      category: "Top Performing",
    })),
    ...bottomSchools.map((school) => ({
      name: school.name,
      passPercentage: school.performance.passPercentage,
      grade: school.performance.grade,
      category: "Bottom Performing",
    })),
  ];

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart
        data={chartData}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 60,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} interval={0} />
        <YAxis />
        <Tooltip
          formatter={(value, name) => [value, name === "passPercentage" ? "Pass %" : "Grade"]}
          labelFormatter={(label) => {
            const school = chartData.find((s) => s.name === label);
            return `${label} (${school?.category})`;
          }}
        />
        <Legend />
        <Bar dataKey="passPercentage" name="Pass %" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}