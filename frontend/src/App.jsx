import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./component/layout";
import Homepage from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import ForgotPassword from "./pages/forgotpassword";
import ResetPassword from "./pages/resetpassword";
import Tools from "./pages/Tools";
import GoogleDorking from "./pages/google-dorking";
import { AuthProvider, ProtectedRoute } from "./context/authContext";

const RootRedirect = () => {
  const token = localStorage.getItem("token");
  return token ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<RootRedirect />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route element={<ProtectedRoute/>}>
          <Route path="/home" element={<Homepage />} />
          </Route>

          {/* Protected Route */}
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route path="/tools" element={<Tools />} />
              <Route path="/google-dorking" element={<GoogleDorking />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
