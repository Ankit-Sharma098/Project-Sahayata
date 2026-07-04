import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/globals.css";
import { Toaster } from "react-hot-toast";
import "leaflet/dist/leaflet.css";
import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Toaster position="top-right" />
    <AuthProvider>

      <App />

    </AuthProvider>
  </React.StrictMode>
);