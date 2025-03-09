import React from "react";
import "./index.css";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { theme } from "./helper/theme.jsx";
import TeacherListingpage from "./Pages/Admin/Pages/TeacherListing";
import StudentListingpage from "./Pages/Admin/Pages/StudentListing";
import Dataanalyticspage from "./Pages/Admin/Pages/Dataanalyticspage";
import AdminLoginpage from "./Pages/Admin/Pages/AdminLoginPage";

import StudentHomePage from "./Pages/Student/StudentPages/StudentHomePage.jsx";
import AdminHome from "./Pages/Admin/Pages/AdminHome";
import AddStudent from "./Pages/Student/StudentPages/StudentSignUpForm.jsx";
import AddTeacher from "./Pages/Teacher/Pages/TeacherSignUpForm.jsx";
import { Toaster } from "react-hot-toast";
import ClassroomListingpage from "./Pages/Admin/Pages/ClassroomListing.jsx";
import Classroom from "./Pages/Admin/Components/ClassroomsListingPageComponents/Classroom.jsx";
import SubmitHomework from "./Pages/Student/StudentPages/SubmitHomework.jsx";
import StudentNotification from "./Pages/Student/StudentPages/StudentNotification.jsx";
import Issuessection from "./Pages/Admin/Pages/Issuessection.jsx";

import TeacherHomePage from "./Pages/Teacher/Pages/TeacherHomePage";
import TeacherSignUpForm from "./Pages/Teacher/Pages/TeacherSignUpForm";
import TeacherProfilePage from "./Pages/Teacher/Pages/TeacherProfilePage";
import MarkTeacherAttendance from "./Pages/Teacher/Pages/MarkTeacherAttendance";
import GenerateTeacherIssue from "./Pages/Teacher/Pages/GenerateTeacherIssue";
import ClassroomStudents from "./Pages/Teacher/Pages/ClassroomStudents";

import AdminForm from "./Pages/Admin/Pages/AdminSignup.jsx";
import AddHomeworkPage from "./Pages/Teacher/Components/HomeworkComponents/AddHomeworkPage.jsx";
import StudentChatbot from "./Pages/Student/StudentPages/StudentChatbot.jsx";
import TeachersClassroom from "./Pages/Teacher/Pages/TeachersClassroom.jsx";

import StudentAttendancePage from "./Pages/Student/StudentPages/StudentAttendancePage.jsx";
import CommonLogin from "./Pages/InitialPages/CommonLogin.jsx";
import TeacherLogin from "./Pages/InitialPages/TeacherLogin.jsx";
import StudentLogin from "./Pages/InitialPages/StudentLogin.jsx";
import LoginAlert from "./components/LoginAlert.jsx";
import PageNotFound from "./components/PageNotFound.jsx";

import LandingPage from "./Pages/InitialPages/LandingPage.jsx";

import Createclassroom from "./Pages/Admin/Components/ClassroomsListingPageComponents/Createclassroom.jsx";
import HwSubmission from "./Pages/Teacher/Pages/HwSubmission.jsx";
import TeacherEmergencyForm from "./Pages/Teacher/Pages/TeacherEmergencyForm.jsx";
import CheckAllAttendance from "./Pages/Teacher/Pages/CheckAllAttendance";
import ClassroomAnalytics from "./Pages/Admin/Components/DataAnalyticsPageComponents/ClassroomAnalytics.jsx";

import ViewClassrooms from "./Pages/Teacher/Pages/ViewClassrooms";
import ClassroomSubmittedHomeworks from "./Pages/Teacher/Pages/ClassroomSubmittedHomeworks";
import ClassroomsLowAttendance from "./Pages/Teacher/Pages/ClassroomsLowAttendance";
import PendingList from "./Pages/Student/Components/submitHWComponent/PendingList.jsx";
import StudentPerformanceReport from "./Pages/Student/StudentPages/StudentPerformanceReport.jsx";
import FilePreviewMain from "./Pages/Student/Components/performanceRepoComponent/FilePreviewMain.jsx";
import ManualAttendancePage from "./Pages/Teacher/Pages/ManualAttendancePage.jsx";
import ClassroomAttendancePage from "./Pages/Teacher/Pages/ClassroomAttendancePage.jsx";
import SelectClassroom from "./Pages/Teacher/Components/SelectClassroomPage.jsx";

import ResourceManagement from "./Pages/Admin/Pages/ResourceManagement";
import RequestResource from "./Pages/Teacher/Pages/RequestResource";
import SubmitHWmainBox from "./Pages/Student/Components/submitHWComponent/submitHWMainCompoent.jsx";
import SchoolListingPage from "./Pages/Admin/Pages/SchoolListing.jsx";
import AddSchools from "./Pages/Admin/Components/SchoolListingPageComponents/AddSchools.jsx";
import GenerateQuiz from "./Pages/Teacher/Pages/GenerateQuiz.jsx";
import StudentQuiz from "./Pages/Student/StudentPages/StudentQuiz.jsx";
//Super Admin
import SuperAdminLayout from "./Pages/SuperAdmin/Layouts/SuperAdminLayout";
import Schools from "./Pages/SuperAdmin/Pages/Schools";
import Home from "./Pages/SuperAdmin/Pages/Home";
import DataAnalytics from "./Pages/SuperAdmin/Pages/DataAnalytics";
import { AttemptQuiz } from "./Pages/Student/Components/attemptQuiz/attemptQuiz.jsx";
import StudentLayout from "./layouts/Layout"
import Layout from "./layouts/Layout";

const App = () => {
  const savedAuth = JSON.parse(localStorage.getItem("auth"));

  // Routers page
  return (
    <>
      <ThemeProvider theme={theme}>
        <Routes>
          {/* Landing Page Route */}
          <Route path="/" element={<LandingPage />} />

          {/* Admin Page Routes */}
          <Route path="/admin" element={savedAuth && savedAuth.role == "admin" ? <Layout /> : <LoginAlert />}>
            <Route path="" element={<AdminHome />} />
            <Route path="schools" element={<SchoolListingPage />} />
            <Route path="add-school" element={<AddSchools />} />
            <Route path="students" element={<StudentListingpage />} />
            <Route path="teachers" element={<TeacherListingpage />} />
            <Route path="classrooms" element={<ClassroomListingpage />} />
            <Route path="create-classroom" element={<Createclassroom />} />
            <Route path="classrooms/:id" element={<Classroom />} />
            <Route path="data-analytics" element={<Dataanalyticspage />} />
            <Route path="issues" element={<Issuessection />} />
            <Route path="classrooms/:classroomId/analytics" element={<ClassroomAnalytics />} />
            <Route path="resources" element={<ResourceManagement />} />
            <Route path="" element={<AdminHome />} />
          </Route>

          {/* SuperAdmin Page Routse */}
          <Route path="/authority" element={<SuperAdminLayout />}>
            <Route path="" element={<Home />} />
            <Route path="schools" element={<Schools />} />
            <Route path="data-analytics" element={<DataAnalytics />} />
          </Route>

            {/* Student Page Routes */}
          <Route path="/student" element={savedAuth && savedAuth.role == "student" ? <Layout /> : <LoginAlert />}>
            <Route path="" element={<StudentHomePage />} />
            <Route path="submit-homework" element={<SubmitHomework />} />
            <Route path="notification" element={<StudentNotification />} />
            <Route path="doubts" element={<StudentChatbot />} />
            <Route path=":id/pending-homework" element={<SubmitHWmainBox />} />
            <Route path="attendance" element={<StudentAttendancePage />} />
            <Route path="performance" element={<StudentPerformanceReport />} />
            <Route path="quizzes" element={<StudentQuiz />} />
            <Route path="attempt-quiz/:id" element={<AttemptQuiz />} />
            <Route path="homework/:id/preview" element={<FilePreviewMain />} />
          </Route>

          {/* Teacher Page Routes */}
          <Route path="/teacher" element={savedAuth && savedAuth.role == "teacher" ? <Layout /> : <LoginAlert />}>
            <Route path="" element={<TeacherHomePage />} />
            <Route path="signup" element={<TeacherSignUpForm />} />
            <Route path="add-homework/form" element={<AddHomeworkPage />} />
            <Route path=":id/homework/:hId/submissions" element={<HwSubmission />} />
            <Route path="mark-attendance" element={<MarkTeacherAttendance />} />
            <Route path="classrooms" element={<TeachersClassroom />} />
            <Route path="generate-issue" element={<GenerateTeacherIssue />} />
            <Route path="classrooms/:classroomId/students" element={<ClassroomStudents />} />
            <Route path="check-all-attendance" element={<CheckAllAttendance />} />
            <Route path="classroomsforHomework" element={<ViewClassrooms />} />
            <Route path="classroom/:id/submitted-homeworks" element={<ClassroomSubmittedHomeworks />} />
            <Route path="classrooms-low-attendance" element={<ClassroomsLowAttendance />} />
            <Route path="request-resource" element={<SelectClassroom />} />
            <Route path=":id/request-resource" element={<RequestResource />} />
            <Route path="manual-attendance" element={<ManualAttendancePage />} />
            <Route path="classrooms/:classroomId/manual-attendance" element={<ClassroomAttendancePage />} />
            <Route path="classroom/:id/generate-quiz" element={<GenerateQuiz />} />
            <Route path="classroom/:id/generate-quiz" element={<GenerateQuiz />} />
          </Route>

          {/* SignUp Page Routes */}
          <Route path="/signup/student" element={<AddStudent />} />
          <Route path="/signup/teacher" element={<AddTeacher />} />
          <Route path="/signup/admin" element={<AdminForm />} />

          {/* Login Page Routes */}
          <Route path="/login" element={<CommonLogin />} />
          <Route path="/login/admin" element={<AdminLoginpage />} />
          <Route path="/login/teacher" element={<TeacherLogin />} />
          <Route path="/login/student" element={<StudentLogin />} />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </ThemeProvider>
      <Toaster />
    </>
  );
};

export default App;
