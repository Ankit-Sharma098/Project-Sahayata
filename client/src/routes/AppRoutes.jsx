import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Report from "../pages/Report";
import Dashboard from "../pages/Dashboard";
import MyReports from "../pages/MyReports";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />

                <Route path="/login" element={<Login />} />

                <Route path="/register" element={<Register />} />

                <Route path="/report" element={<Report />} />

                <Route
                    path="/dashboard"
                    element={<Dashboard />}
                />

                <Route
                    path="/my-reports"
                    element={<MyReports />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;