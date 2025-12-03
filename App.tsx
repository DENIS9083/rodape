import { BrowserRouter as Router, Routes, Route } from "react-router";
import { AuthProvider } from "@getmocha/users-service/react";
import HomePage from "@/react-app/pages/Home";
import MovieDetailsPage from "@/react-app/pages/MovieDetails";
import LoginPage from "@/react-app/pages/Login";
import AuthCallbackPage from "@/react-app/pages/AuthCallback";
import SettingsPage from "@/react-app/pages/Settings";
import PaymentPage from "@/react-app/pages/Payment";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movie/:id" element={<MovieDetailsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/auth/callback" element={<AuthCallbackPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/payment/:bookingId" element={<PaymentPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
