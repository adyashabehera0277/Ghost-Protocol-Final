// App.jsx – defines which page appears at which URL.
// The certificate route is added in Part 6.
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import KnowledgeHub from "./pages/KnowledgeHub.jsx";
import Progress from "./pages/Progress.jsx";
import Profile from "./pages/Profile.jsx";
import Beginner from "./pages/Beginner.jsx";
import Intermediate from "./pages/Intermediate.jsx";
import Pro from "./pages/Pro.jsx";
import PasswordGuardian from "./games/PasswordGuardian.jsx";
import LinkDetective from "./games/LinkDetective.jsx";
import PhishingInvestigator from "./games/PhishingInvestigator.jsx";
import EmailInvestigation from "./games/EmailInvestigation.jsx";
import FirewallChallenge from "./games/FirewallChallenge.jsx";
import SocialEngineering from "./games/SocialEngineering.jsx";
import CryptographyLab from "./games/CryptographyLab.jsx";
import NetworkInvestigation from "./games/NetworkInvestigation.jsx";
import FinalMission from "./games/FinalMission.jsx";
import { isLoggedIn } from "./utils/storage.js";

// If the user is not logged in, send them to the login page.
function ProtectedRoute({ children }) {
  return isLoggedIn() ? children : <Navigate to="/" replace />;
}

// Shortcut so we do not repeat ProtectedRoute for every page
function Private({ children }) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route path="/dashboard" element={<Private><Dashboard /></Private>} />
      <Route path="/learn" element={<Private><KnowledgeHub /></Private>} />
      <Route path="/progress" element={<Private><Progress /></Private>} />
      <Route path="/profile" element={<Private><Profile /></Private>} />

      {/* Beginner */}
      <Route path="/beginner" element={<Private><Beginner /></Private>} />
      <Route path="/beginner/password-guardian" element={<Private><PasswordGuardian /></Private>} />
      <Route path="/beginner/link-detective" element={<Private><LinkDetective /></Private>} />
      <Route path="/beginner/phishing-investigator" element={<Private><PhishingInvestigator /></Private>} />

      {/* Intermediate */}
      <Route path="/intermediate" element={<Private><Intermediate /></Private>} />
      <Route path="/intermediate/email-investigation" element={<Private><EmailInvestigation /></Private>} />
      <Route path="/intermediate/firewall-challenge" element={<Private><FirewallChallenge /></Private>} />
      <Route path="/intermediate/social-engineering" element={<Private><SocialEngineering /></Private>} />

      {/* Pro */}
      <Route path="/pro" element={<Private><Pro /></Private>} />
      <Route path="/pro/cryptography-lab" element={<Private><CryptographyLab /></Private>} />
      <Route path="/pro/network-investigation" element={<Private><NetworkInvestigation /></Private>} />
      <Route path="/pro/final-mission" element={<Private><FinalMission /></Private>} />

      {/* Unknown URLs go to the dashboard (or login if logged out) */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}