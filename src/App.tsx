import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import Calendar from "./pages/Calendar";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
// Department imports
import ITDepartment from "./pages/Department/IT";
import ECEDepartment from "./pages/Department/ECE";
import EEEDepartment from "./pages/Department/EEE";
import CivilDepartment from "./pages/Department/Civil";
import MechanicalDepartment from "./pages/Department/Mechanical";

export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Redirect root to signin for LMS */}
          <Route index path="/" element={<Navigate to="/signin" replace />} />

          {/* Dashboard Layout - Dashboard, Calendar, and Department pages */}
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Home />} />
            <Route path="/calendar" element={<Calendar />} />
            
            {/* Department Routes */}
            <Route path="/department/it" element={<ITDepartment />} />
            <Route path="/department/ece" element={<ECEDepartment />} />
            <Route path="/department/eee" element={<EEEDepartment />} />
            <Route path="/department/civil" element={<CivilDepartment />} />
            <Route path="/department/mechanical" element={<MechanicalDepartment />} />
          </Route>

          {/* Auth Layout */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
