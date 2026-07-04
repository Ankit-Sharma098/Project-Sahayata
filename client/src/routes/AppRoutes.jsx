import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Report from "../pages/Report";
import Dashboard from "../pages/Dashboard";
import MyReports from "../pages/MyReports";
import Profile from "../pages/Profile";
import ReportDetails from "../pages/ReportDetails";
import MunicipalityDashboard from "../pages/MunicipalityDashboard";
import Leaderboard from "../pages/Leaderboard";
import Recommendation from "../pages/Recommendation";
import AdminDashboard from "../pages/AdminDashboard";
import RoleProtectedRoute from "./RoleProtectedRoute";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/report" element={<Report />} />

        <Route path="/my-reports" element={<MyReports />} />

        <Route path="/profile" element={<Profile />} />

        <Route
          path="/report/:id"
          element={<ReportDetails />}
        />

        <Route
          path="/municipality"
          element={<MunicipalityDashboard />}
        />

        <Route
          path="/leaderboard"
          element={<Leaderboard />}
        />

        <Route
          path="/recommendation"
          element={<Recommendation />}
        />

        <Route
          path="/admin"
          element={<AdminDashboard />}
        />

      </Routes>

      <Route
  path="/dashboard"
  element={
    <RoleProtectedRoute
      roles={["Citizen"]}
    >
      <Dashboard />
    </RoleProtectedRoute>
  }
/>

<Route
  path="/municipality"
  element={
    <RoleProtectedRoute
      roles={[
        "Municipality",
      ]}
    >
      <MunicipalityDashboard />
    </RoleProtectedRoute>
  }
/>

<Route
  path="/admin"
  element={
    <RoleProtectedRoute
      roles={["Admin"]}
    >
      <AdminDashboard />
    </RoleProtectedRoute>
  }
/>
    </BrowserRouter>
  );
}

export default AppRoutes;