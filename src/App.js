import "./App.css";
import AdminView from "./views/admin/pages/AdminView";
import DoctorView from "./views/docmodule/Doctor/DoctorView";
import ClinicView from "./views/docmodule/Clinic/ClinicView";
import Login from "./views/Login";
import ProtectedRoute from "./Components/ProtectedRoute";

import { AuthProvider } from "./Contexts/AuthContext";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminView />
              </ProtectedRoute>
            }
          />
          <Route
            path="/doctor"
            element={
              <ProtectedRoute>
                <DoctorView />
              </ProtectedRoute>
            }
          />
          <Route
            path="/clinic"
            element={
              <ProtectedRoute>
                <ClinicView />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
