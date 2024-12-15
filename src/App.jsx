import "./index.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";

//ADMIN PAGES
import {
  TeacherListingpage,
  StudentListingpage,
  Dataanalyticspage,
  AdminLoginpage,
  AdminHome,
  ClassroomListingpage,
  Classroom,
  Issuessection,
  AdminForm,
  AdminEmergencyAlert,
  ResourceManagement,
  ClassroomAnalytics,
  Createclassroom
} from './Pages/Admin/Pages';

//STUDENT PAGES
import {
  StudentHomePage,
  AddStudent,
  SubmitHomework,
  StudentNotification,
  StudentChatbot,
  StudentAttendancePage,
  StudentPerformanceReport,
  PendingList,
  FilePreviewMain
} from './Pages/Student/StudentPages';

//TEACHER PAGES
import {
  TeacherHomePage,
  TeacherSignUpForm,
  TeacherProfilePage,
  MarkTeacherAttendance,
  GenerateTeacherIssue,
  ClassroomStudents,
  AddHomeworkPage,
  HomeWorkManage,
  HwSubmission,
  CheckAllAttendance,
  ViewClassrooms,
  ClassroomSubmittedHomeworks,
  ClassroomsLowAttendance,
  ManualAttendancePage,
  ClassroomAttendancePage,
  RequestResource,
  TeacherEmergencyForm
} from './Pages/Teacher/Pages';

//INITIAL PAGES
import {
  Initial,
  CommonLogin,
  TeacherLogin,
  StudentLogin,
  LandingPage
} from './Pages/InitialPages';

//OTHER COMPONENTS
import {
  LoginAlert,
  PageNotFound,
  FilePreview
} from './components';

function App() {
  const savedAuth = JSON.parse(localStorage.getItem("auth"));

  // Routers page
  return (
    <>
      <Routes>
        {/* Landing Page Route */}
        <Route path="/" element={<LandingPage />} />

        {/* Admin Page Routes */}
        <Route path='/admin' element={savedAuth && savedAuth.role == 'admin' ? <AdminHome /> : <LoginAlert />} />
        <Route path="/admin/students" element={savedAuth && savedAuth.role == 'admin' ? <StudentListingpage /> : <LoginAlert />} />
        <Route path="/admin/teachers" element={savedAuth && savedAuth.role == 'admin' ? <TeacherListingpage /> : <LoginAlert />} />
        <Route path="/admin/classrooms" element={savedAuth && savedAuth.role == 'admin' ? <ClassroomListingpage /> : <LoginAlert />} />
        <Route path="/admin/create-classroom" element={savedAuth && savedAuth.role == 'admin' ? <Createclassroom /> : <LoginAlert />} />
        <Route path="/admin/classrooms/:id" element={savedAuth && savedAuth.role == 'admin' ? <Classroom /> : <LoginAlert />} />
        <Route path="/admin/data-analytics" element={savedAuth && savedAuth.role == 'admin' ? <Dataanalyticspage /> : <LoginAlert />} />
        <Route path='/admin/issues' element={savedAuth && savedAuth.role == 'admin' ? <Issuessection /> : <LoginAlert />} />
        <Route path="/admin/classrooms/:classroomId/analytics" element={savedAuth && savedAuth.role == 'admin' ? <ClassroomAnalytics /> : <LoginAlert />} />
        <Route path="/admin/resources" element={savedAuth && savedAuth.role === 'admin' ? <ResourceManagement /> : <LoginAlert />} />

        {/* Student Page Routes  */}
        <Route path='/student' element={savedAuth && savedAuth.role == 'student' ? <StudentHomePage /> : <LoginAlert />} />
        <Route path='/student/submit-homework' element={savedAuth && savedAuth.role == 'student' ? <SubmitHomework /> : <LoginAlert />} />
        <Route path='/student/notification' element={savedAuth && savedAuth.role == 'student' ? <StudentNotification /> : <LoginAlert />} />
        <Route path='/student/doubts' element={savedAuth && savedAuth.role == 'student' ? <StudentChatbot /> : <LoginAlert />} />
        <Route path='/student/:id/pending-homework' element={savedAuth && savedAuth.role == 'student' ? <PendingList /> : <LoginAlert />} />
        <Route path='/student/attendance' element={savedAuth && savedAuth.role == 'student' ? <StudentAttendancePage /> : <LoginAlert />} />
        <Route path="/student/homework/:id/preview" element={savedAuth && savedAuth.role == 'student' ? <FilePreviewMain /> : <LoginAlert />} />
        <Route path='/student/performance' element={savedAuth && savedAuth.role == 'student' ? <StudentPerformanceReport /> : <LoginAlert />} />

        {/* Teacher Page Routes */}
        <Route path='/teacher' element={savedAuth && savedAuth.role == 'teacher' ? <TeacherHomePage /> : <LoginAlert />} />
        <Route path='/teacher/signup' element={savedAuth && savedAuth.role == 'teacher' ? <TeacherSignUpForm /> : <LoginAlert />} />
        <Route path='/teacher/profile' element={savedAuth && savedAuth.role == 'teacher' ? <TeacherProfilePage /> : <LoginAlert />} />
        <Route path='/teacher/add-homework' element={savedAuth && savedAuth.role == 'teacher' ? <HomeWorkManage /> : <LoginAlert />} />
        <Route path="/teacher/add-homework/form" element={savedAuth && savedAuth.role == 'teacher' ? <AddHomeworkPage /> : <LoginAlert />} />
        <Route path="/teacher/:id/homework/:hId/submissions" element={savedAuth && savedAuth.role == 'teacher' ? <HwSubmission /> : <LoginAlert />} />
        <Route path='/teacher/mark-attendance' element={savedAuth && savedAuth.role == 'teacher' ? <MarkTeacherAttendance /> : <LoginAlert />} />
        <Route path="/teacher/classrooms" element={savedAuth && savedAuth.role == 'teacher' ? <TeachersClassroom /> : <LoginAlert />} />
        <Route path='/teacher/generate-issue' element={savedAuth && savedAuth.role == 'teacher' ? <GenerateTeacherIssue /> : <LoginAlert />} />
        <Route path="/teacher/classrooms/:classroomId/students" element={savedAuth && savedAuth.role == 'teacher' ? <ClassroomStudents /> : <LoginAlert />} />
        <Route path="/teacher/check-all-attendance" element={savedAuth && savedAuth.role == 'teacher' ? <CheckAllAttendance /> : <LoginAlert />} />
        <Route path="/teacher/classroomsforHomework" element={savedAuth && savedAuth.role == 'teacher' ? <ViewClassrooms /> : <LoginAlert />} />
        <Route path="/teacher/classroom/:id/submitted-homeworks" element={savedAuth && savedAuth.role == 'teacher' ? <ClassroomSubmittedHomeworks /> : <LoginAlert />} />
        <Route path="/teacher/classrooms-low-attendance" element={<ClassroomsLowAttendance />} />
        <Route path="/teacher/request-resource" element={<RequestResource />} />
        <Route path="/teacher/manual-attendance" element={<ManualAttendancePage />} />
        <Route path="/teacher/classrooms/:classroomId/manual-attendance" element={<ClassroomAttendancePage />} />

        {/* SignUp Page Routes */}
        <Route path='/signup/student' element={<AddStudent />} />
        <Route path='/signup/teacher' element={<AddTeacher />} />
        <Route path="/signup/admin" element={<AdminForm />} />

        {/* Login Page Routes */}
        <Route path="/login" element={<CommonLogin />} />
        <Route path="/login/admin" element={<AdminLoginpage />} />
        <Route path="/login/teacher" element={<TeacherLogin />} />
        <Route path="/login/student" element={<StudentLogin />} />

        {/* emergency alert routes */}
        <Route path="/teacher/emergency" element={<TeacherEmergencyForm />} />
        <Route path="/admin/emergency" element={<AdminEmergencyAlert />} />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Toaster />
    </>
  )
}

export default App;