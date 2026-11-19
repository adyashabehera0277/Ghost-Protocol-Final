// Login.jsx – Login and Signup page (simulated, frontend-only).
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  Lock,
  Mail,
  User,
  UserPlus,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
  Info,
  Radar,
  KeyRound,
  Fingerprint,
} from "lucide-react";
import {
  loginUser,
  registerUser,
  isLoggedIn,
  isValidEmail,
  isValidUsername,
  isStrongEnough,
  DEMO_ACCOUNT,
} from "../utils/storage.js";

// Empty form values (used to reset the form)
const emptyForm = {
  identifier: "", // username or email (login)
  fullName: "",
  email: "",
  username: "",
  password: "",
  confirmPassword: "",
};

// A decorative digital shield drawn with SVG (animated with CSS)
function ShieldIllustration() {
  return (
    <svg
      className="shield-art"
      viewBox="0 0 300 300"
      role="img"
      aria-label="Digital shield with a lock"
    >
      <defs>
        <linearGradient id="shieldGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#00E5FF" />
          <stop offset="100%" stopColor="#9B5CFF" />
        </linearGradient>
      </defs>

      {/* Rotating rings */}
      <circle className="ring ring-1" cx="150" cy="150" r="130" />
      <circle className="ring ring-2" cx="150" cy="150" r="105" />

      {/* Network lines and nodes */}
      <g className="net">
        <line x1="150" y1="20" x2="150" y2="50" />
        <line x1="40" y1="95" x2="75" y2="115" />
        <line x1="260" y1="95" x2="225" y2="115" />
        <line x1="60" y1="235" x2="95" y2="205" />
        <line x1="240" y1="235" x2="205" y2="205" />
        <circle className="node" cx="150" cy="20" r="6" />
        <circle className="node n2" cx="40" cy="95" r="6" />
        <circle className="node n3" cx="260" cy="95" r="6" />
        <circle className="node n4" cx="60" cy="235" r="6" />
        <circle className="node n5" cx="240" cy="235" r="6" />
      </g>

      {/* Shield */}
      <path
        className="shield-path"
        d="M150 50 L225 80 V145 C225 190 195 222 150 245 C105 222 75 190 75 145 V80 Z"
        fill="rgba(0,229,255,0.07)"
        stroke="url(#shieldGrad)"
        strokeWidth="3"
      />

      {/* Lock */}
      <rect x="125" y="140" width="50" height="40" rx="6" fill="none" stroke="#00E5FF" strokeWidth="3" />
      <path d="M135 140 V125 a15 15 0 0 1 30 0 V140" fill="none" stroke="#00E5FF" strokeWidth="3" />
      <circle cx="150" cy="160" r="5" fill="#E348FF" />
    </svg>
  );
}

export default function Login() {
  const navigate = useNavigate();

  const [mode, setMode] = useState("login"); // "login" or "signup"
  const [form, setForm] = useState(emptyForm);
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [message, setMessage] = useState(null); // { type: "error" | "success" | "info", text }

  // If the user is already logged in, skip this page.
  if (isLoggedIn()) {
    return <Navigate to="/dashboard" replace />;
  }

  // Update one field in the form
  function handleChange(event) {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  }

  // Switch between Login and Signup
  function switchMode(newMode) {
    setMode(newMode);
    setForm(emptyForm);
    setMessage(null);
    setShowPassword(false);
  }

  // Fill the form with the demo account
  function fillDemo() {
    setMode("login");
    setForm({ ...emptyForm, identifier: DEMO_ACCOUNT.username, password: DEMO_ACCOUNT.password });
    setMessage({ type: "info", text: "Demo credentials filled in. Press LOGIN." });
  }

  // ---------- LOGIN ----------
  function handleLogin(event) {
    event.preventDefault();

    if (!form.identifier.trim() || !form.password) {
      setMessage({ type: "error", text: "Please enter your username/email and password." });
      return;
    }

    const result = loginUser(form.identifier, form.password, remember);
    if (!result.ok) {
      setMessage({ type: "error", text: result.message });
      return;
    }

    setMessage({ type: "success", text: result.message });
    // Short pause so the user can read the success message
    setTimeout(() => navigate("/dashboard"), 700);
  }

  // ---------- SIGNUP ----------
  function handleSignup(event) {
    event.preventDefault();
    const { fullName, email, username, password, confirmPassword } = form;

    if (!fullName.trim() || !email.trim() || !username.trim() || !password || !confirmPassword) {
      setMessage({ type: "error", text: "Please fill in all the fields." });
      return;
    }
    if (fullName.trim().length < 2) {
      setMessage({ type: "error", text: "Please enter your full name." });
      return;
    }
    if (!isValidEmail(email.trim())) {
      setMessage({ type: "error", text: "Please enter a valid email address." });
      return;
    }
    if (!isValidUsername(username.trim())) {
      setMessage({
        type: "error",
        text: "Username must be 3-20 characters: letters, numbers or underscore only.",
      });
      return;
    }
    if (!isStrongEnough(password)) {
      setMessage({
        type: "error",
        text: "Password must be at least 8 characters and include letters and numbers.",
      });
      return;
    }
    if (password !== confirmPassword) {
      setMessage({ type: "error", text: "Passwords do not match." });
      return;
    }

    // Note: the password is NOT passed to registerUser, so it can never be stored.
    const result = registerUser({ fullName, email, username });
    if (!result.ok) {
      setMessage({ type: "error", text: result.message });
      return;
    }

    // Go back to the login form with the username filled in
    setMode("login");
    setForm({ ...emptyForm, identifier: username.trim() });
    setMessage({ type: "success", text: result.message });
  }

  // Forgot password (simulated)
  function handleForgot(event) {
    event.preventDefault();
    setMessage({
      type: "info",
      text: "Demo mode: password reset is not available in this frontend-only prototype.",
    });
  }

  // Choose the right icon for the message box
  const MessageIcon =
    message?.type === "success" ? CheckCircle2 : message?.type === "info" ? Info : AlertCircle;

  return (
    <main className="auth-page">
      {/* ---------- Left side: branding ---------- */}
      <section className="auth-hero">
        <div className="logo logo-large">
          <ShieldCheck size={34} />
          GHOST PROTOCOL
        </div>
        <span className="tag">Cybersecurity Escape Room</span>

        <h1 className="hero-title">
          WELCOME, <span className="gradient-text">AGENT.</span>
        </h1>
        <p className="hero-tagline">Your mission begins in the digital shadows.</p>

        <ShieldIllustration />

        <ul className="hero-features">
          <li>
            <KeyRound size={16} /> Password safety
          </li>
          <li>
            <Radar size={16} /> Threat detection
          </li>
          <li>
            <Fingerprint size={16} /> Phishing awareness
          </li>
        </ul>
      </section>

      {/* ---------- Right side: login / signup card ---------- */}
      <section className="auth-card card">
        <div className="auth-tabs">
          <button
            type="button"
            className={mode === "login" ? "active" : ""}
            onClick={() => switchMode("login")}
          >
            Login
          </button>
          <button
            type="button"
            className={mode === "signup" ? "active" : ""}
            onClick={() => switchMode("signup")}
          >
            Create Account
          </button>
        </div>

        {message && (
          <div className={`auth-message ${message.type}`} role="alert">
            <MessageIcon size={18} />
            <span>{message.text}</span>
          </div>
        )}

        {mode === "login" ? (
          <form onSubmit={handleLogin} noValidate>
            <label className="field">
              <span>Username or Email</span>
              <div className="field-box">
                <User size={18} />
                <input
                  className="input"
                  type="text"
                  name="identifier"
                  placeholder="agent or agent@ghostprotocol.demo"
                  value={form.identifier}
                  onChange={handleChange}
                  autoComplete="username"
                />
              </div>
            </label>

            <label className="field">
              <span>Password</span>
              <div className="field-box">
                <Lock size={18} />
                <input
                  className="input"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="eye-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </label>

            <div className="auth-row">
              <label className="check">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                Remember Me
              </label>
              <a href="#forgot" onClick={handleForgot}>
                Forgot Password?
              </a>
            </div>

            <button type="submit" className="btn btn-primary btn-block">
              Login
            </button>

            <p className="auth-switch">
              New agent?{" "}
              <button type="button" className="link-btn" onClick={() => switchMode("signup")}>
                Create Account
              </button>
            </p>
          </form>
        ) : (
          <form onSubmit={handleSignup} noValidate>
            <label className="field">
              <span>Full Name</span>
              <div className="field-box">
                <User size={18} />
                <input
                  className="input"
                  type="text"
                  name="fullName"
                  placeholder="Your full name"
                  value={form.fullName}
                  onChange={handleChange}
                  autoComplete="name"
                />
              </div>
            </label>

            <label className="field">
              <span>Email</span>
              <div className="field-box">
                <Mail size={18} />
                <input
                  className="input"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  autoComplete="email"
                />
              </div>
            </label>

            <label className="field">
              <span>Username</span>
              <div className="field-box">
                <UserPlus size={18} />
                <input
                  className="input"
                  type="text"
                  name="username"
                  placeholder="Choose an agent name"
                  value={form.username}
                  onChange={handleChange}
                  autoComplete="username"
                />
              </div>
            </label>

            <label className="field">
              <span>Password</span>
              <div className="field-box">
                <Lock size={18} />
                <input
                  className="input"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Min 8 characters, letters + numbers"
                  value={form.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="eye-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </label>

            <label className="field">
              <span>Confirm Password</span>
              <div className="field-box">
                <Lock size={18} />
                <input
                  className="input"
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Repeat your password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  autoComplete="new-password"
                />
              </div>
            </label>

            <button type="submit" className="btn btn-primary btn-block">
              Create Account
            </button>

            <p className="auth-switch">
              Already an agent?{" "}
              <button type="button" className="link-btn" onClick={() => switchMode("login")}>
                Login
              </button>
            </p>
          </form>
        )}

        {/* Demo account box */}
        <div className="demo-box">
          <strong>Demo account</strong>
          <p>
            Username: <code>{DEMO_ACCOUNT.username}</code> &nbsp; Password:{" "}
            <code>{DEMO_ACCOUNT.password}</code>
          </p>
          <button type="button" className="btn btn-outline btn-block" onClick={fillDemo}>
            Use Demo Account
          </button>
        </div>

        <p className="auth-note">
          Educational prototype: this login is simulated on the frontend. Passwords are never
          stored. Real secure authentication requires a backend server.
        </p>
      </section>
    </main>
  );
}