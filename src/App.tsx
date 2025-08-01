import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
// import SignUp from "./pages/AuthPages/SignUp"; // Commented out - Sign up functionality removed
import NotFound from "./pages/OtherPage/NotFound";
import Calendar from "./pages/Calendar";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import { useEffect, useState } from "react";
// Department imports
import ITDepartment from "./pages/Department/IT";
import ECEDepartment from "./pages/Department/ECE";
import EEEDepartment from "./pages/Department/EEE";
import CivilDepartment from "./pages/Department/Civil";
import MechanicalDepartment from "./pages/Department/Mechanical";
import SemesterDetail from "./pages/SemesterDetail";
// Teacher and Student imports
import TeacherPage from "./pages/Teacher";
import StudentPage from "./pages/Student";


// Check if user is authenticated
const isAuthenticated = () => {
  return localStorage.getItem("authToken") !== null;
};

// Protected Route component - redirects to login if not authenticated
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  return isAuthenticated() ? <>{children}</> : <Navigate to="/signin" replace />;
};

export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Auth Layout */}
          <Route path="/signin" element={isAuthenticated() ? <Navigate to="/" replace /> : <SignIn />} />
          {/* <Route path="/signup" element={<SignUp />} /> */} {/* Sign up route commented out */}

          {/* Dashboard Layout - Dashboard, Teacher, Department, Student pages */}
          <Route element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }>
            {/* Root path shows dashboard */}
            <Route index path="/" element={<Home />} />
            {/* Redirect /dashboard to root for clean URL */}
            <Route path="/dashboard" element={<Navigate to="/" replace />} />
            <Route path="/teacher" element={<TeacherPage />} />
            <Route path="/calendar" element={<Calendar />} />
            
            {/* Department Routes */}
            <Route path="/department/it" element={<ITDepartment />} />
            <Route path="/department/ece" element={<ECEDepartment />} />
            <Route path="/department/eee" element={<EEEDepartment />} />
            <Route path="/department/civil" element={<CivilDepartment />} />
            <Route path="/department/mechanical" element={<MechanicalDepartment />} />
            
            <Route path="/student" element={<StudentPage />} />
            
            {/* Semester Detail Routes */}
            <Route path="/:department/:programme/:batch/:semester" element={<SemesterDetail />} />
          </Route>

          {/* Auth Layout */}
          <Route path="/signin" element={isAuthenticated() ? <Navigate to="/dashboard" replace /> : <SignIn />} />
          {/* <Route path="/signup" element={<SignUp />} /> */} {/* Sign up route commented out */}

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
