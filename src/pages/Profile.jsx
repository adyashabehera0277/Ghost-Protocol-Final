// Profile.jsx – player info, sound preference and reset progress.
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, RotateCcw, Volume2, VolumeX, AlertTriangle } from "lucide-react";
import Navbar from "../components/Navbar.jsx";
import { getSession, logoutUser } from "../utils/storage.js";
import { useProgress, resetProgress, setPreference } from "../utils/gameProgress.js";
import { getRank } from "../utils/scoring.js";

export default function Profile() {
  const navigate = useNavigate();
  const session = getSession();
  const progress = useProgress();
  const rank = getRank(progress.xp);
  const [confirming, setConfirming] = useState(false);
  const [message, setMessage] = useState("");

  function handleReset() {
    resetProgress();
    setConfirming(false);
    setMessage("Progress has been reset. You are back at the start.");
  }

  function handleLogout() {
    logoutUser();
    navigate("/");
  }

  return (
    <>
      <Navbar />
      <main className="page">
        <span className="tag">Profile</span>
        <h1>
          AGENT <span className="gradient-text">PROFILE</span>
        </h1>

        <section className="card profile-card">
          <div className="avatar avatar-lg">
            {(session?.fullName || "AG")
              .split(" ")
              .filter(Boolean)
              .slice(0, 2)
              .map((w) => w[0].toUpperCase())
              .join("")}
          </div>
          <dl className="profile-list">
            <div>
              <dt>Full name</dt>
              <dd>{session?.fullName}</dd>
            </div>
            <div>
              <dt>Username</dt>
              <dd>@{session?.username}</dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>{session?.email}</dd>
            </div>
            <div>
              <dt>Rank</dt>
              <dd>{rank.name}</dd>
            </div>
            <div>
              <dt>Total XP</dt>
              <dd>{progress.xp}</dd>
            </div>
            <div>
              <dt>Last login</dt>
              <dd>{session?.loggedInAt ? new Date(session.loggedInAt).toLocaleString() : "-"}</dd>
            </div>
          </dl>
        </section>

        <section className="card">
          <h3>PREFERENCES</h3>
          <label className="switch-row">
            <span>
              {progress.preferences.sound ? <Volume2 size={18} /> : <VolumeX size={18} />}
              Sound effects (off by default)
            </span>
            <input
              type="checkbox"
              checked={progress.preferences.sound}
              onChange={(e) => setPreference("sound", e.target.checked)}
            />
          </label>
        </section>

        <section className="card danger-zone">
          <h3>
            <AlertTriangle size={18} /> DANGER ZONE
          </h3>
          <p className="muted">
            Resetting deletes your XP, completed stages, badges and activity for this account.
          </p>

          {message && <p className="daily-feedback success">{message}</p>}

          {!confirming ? (
            <button className="btn btn-danger" onClick={() => setConfirming(true)}>
              <RotateCcw size={16} /> Reset Progress
            </button>
          ) : (
            <div className="confirm-row">
              <strong>Are you sure? This cannot be undone.</strong>
              <button className="btn btn-danger" onClick={handleReset}>
                Yes, reset
              </button>
              <button className="btn btn-ghost" onClick={() => setConfirming(false)}>
                Cancel
              </button>
            </div>
          )}
        </section>

        <button className="btn btn-outline" onClick={handleLogout}>
          <LogOut size={16} /> Logout
        </button>
      </main>
    </>
  );
}