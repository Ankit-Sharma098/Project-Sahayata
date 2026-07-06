import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Report from "../pages/Report";
import MyReports from "../pages/MyReports";
import Profile from "../pages/Profile";
import ReportDetails from "../pages/ReportDetails";
import MunicipalityDashboard from "../pages/MunicipalityDashboard";
import Leaderboard from "../pages/Leaderboard";
import Recommendation from "../pages/Recommendation";
import AdminDashboard from "../pages/AdminDashboard";

import RoleProtectedRoute from "./RoleProtectedRoute";
import Notifications from "../pages/Notification";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>

                {/* ================= PUBLIC ROUTES ================= */}

                <Route path="/" element={<Home />} />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/leaderboard"
                    element={<Leaderboard />}
                />

                {/* ================= CITIZEN ROUTES ================= */}

                <Route
                    path="/dashboard"
                    element={
                        <RoleProtectedRoute roles={["Citizen"]}>
                            <Dashboard />
                        </RoleProtectedRoute>
                    }
                />

                <Route
                    path="/report"
                    element={
                        <RoleProtectedRoute roles={["Citizen"]}>
                            <Report />
                        </RoleProtectedRoute>
                    }
                />

                <Route
                    path="/my-reports"
                    element={
                        <RoleProtectedRoute roles={["Citizen"]}>
                            <MyReports />
                        </RoleProtectedRoute>
                    }
                />

                <Route
                    path="/profile"
                    element={
                        <RoleProtectedRoute
                            roles={[
                                "Citizen",
                                "Municipality",
                                "Admin",
                            ]}
                        >
                            <Profile />
                        </RoleProtectedRoute>
                    }
                />

                <Route
                    path="/report/:id"
                    element={
                        <RoleProtectedRoute
                            roles={[
                                "Citizen",
                                "Municipality",
                                "Admin",
                            ]}
                        >
                            <ReportDetails />
                        </RoleProtectedRoute>
                    }
                />

                <Route
                    path="/recommendation"
                    element={
                        <RoleProtectedRoute roles={["Citizen"]}>
                            <Recommendation />
                        </RoleProtectedRoute>
                    }
                />

                {/* ================= MUNICIPALITY ================= */}

                <Route
                    path="/municipality"
                    element={
                        <RoleProtectedRoute
                            roles={[
                                "Municipality",
                                "Admin",
                            ]}
                        >
                            <MunicipalityDashboard />
                        </RoleProtectedRoute>
                    }
                />

                {/* ================= ADMIN ================= */}

                <Route
                    path="/admin"
                    element={
                        <RoleProtectedRoute roles={["Admin"]}>
                            <AdminDashboard />
                        </RoleProtectedRoute>
                    }
                />
                <Route
                    path="/notifications"
                    element={
                        <RoleProtectedRoute
                            roles={[
                                "Citizen",
                                "Municipality",
                                "Admin",
                            ]}
                        >
                            <Notifications />
                        </RoleProtectedRoute>
                    }
                />

            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;