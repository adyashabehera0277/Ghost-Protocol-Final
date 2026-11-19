// Dashboard.jsx – the Cybersecurity Learning Hub (main page after login).
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Zap, Target, Award, Info } from "lucide-react";
import Navbar from "../components/Navbar.jsx";
import LevelCard from "../components/LevelCard.jsx";
import ProgressBar from "../components/ProgressBar.jsx";
import AchievementBadge from "../components/AchievementBadge.jsx";
import DailyChallenge from "../components/DailyChallenge.jsx";
import { LEVELS, ALL_STAGES } from "../data/levels.js";
import { ACHIEVEMENTS } from "../data/achievements.js";
import { getSession } from "../utils/storage.js";
import {
  useProgress,
  getLevelPercent,
  getOverallPercent,
  isLevelUnlocked,
  getCompletedStageCount,
  getLevelCompletedCount,
} from "../utils/gameProgress.js";
import { getRank } from "../utils/scoring.js";

// "Demo Agent" -> "DA"
function getInitials(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");
}

export default function Dashboard() {
  const navigate = useNavigate();
  const session = getSession();
  const progress = useProgress();
  const [notice, setNotice] = useState(null);

  const rank = getRank(progress.xp);
  const overall = getOverallPercent(progress);
  const completedMissions = getCompletedStageCount(progress);

  // Hide the notice automatically after 4 seconds
  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(null), 4000);
    return () => clearTimeout(timer);
  }, [notice]);

  function handleStart(level) {
    if (!isLevelUnlocked(progress, level.id)) {
      const index = LEVELS.findIndex((l) => l.id === level.id);
      const previous = LEVELS[index - 1];
      setNotice(
        `${level.name} is locked. Complete all ${previous.name} stages to unlock it.`
      );
      return;
    }
    navigate(level.path);
  }

  return (
    <>
      <Navbar />
      <main className="page">
        {notice && (
          <div className="toast" role="alert">
            <Info size={18} /> {notice}
          </div>
        )}

        {/* ---------- Welcome + player summary ---------- */}
        <section className="hero-grid">
          <div className="card welcome-card">
            <span className="tag">Learning Hub</span>
            <h1 className="welcome-title">
              WELCOME BACK, <span className="gradient-text">AGENT.</span>
            </h1>
            <p className="welcome-sub">Your journey to becoming a cyber defender starts here.</p>
            <p className="muted">
              Cybersecurity is the practice of protecting computers, networks and digital
              information from cyber threats. Learn how to recognize attacks, protect sensitive
              information and stay safe online through interactive missions.
            </p>
            <ProgressBar value={overall} label="Overall progress" />
          </div>

          <aside className="card player-card">
            <div className="avatar">{getInitials(session?.fullName) || "AG"}</div>
            <h3>{session?.fullName}</h3>
            <p className="muted">@{session?.username}</p>
            <span className="tag">{rank.name}</span>
            <div className="player-xp">
              <ProgressBar
                value={rank.percentToNext}
                label={rank.next ? `${rank.xpToNext} XP to ${rank.next.name}` : "Maximum rank reached"}
              />
            </div>
          </aside>
        </section>

        {/* ---------- Stats ---------- */}
        <section className="stats-row">
          <div className="card stat-card">
            <Zap size={22} />
            <div>
              <span className="stat-value">{progress.xp}</span>
              <span className="stat-label">Total XP</span>
            </div>
          </div>
          <div className="card stat-card">
            <Target size={22} />
            <div>
              <span className="stat-value">
                {completedMissions}/{ALL_STAGES.length}
              </span>
              <span className="stat-label">Completed missions</span>
            </div>
          </div>
          <div className="card stat-card">
            <Award size={22} />
            <div>
              <span className="stat-value stat-small">{rank.name}</span>
              <span className="stat-label">Current rank</span>
            </div>
          </div>
        </section>

        {/* ---------- Training path ---------- */}
        <h2 className="section-title">YOUR TRAINING PATH</h2>
        <section className="level-grid">
          {LEVELS.map((level) => (
            <LevelCard
              key={level.id}
              level={level}
              percent={getLevelPercent(progress, level)}
              locked={!isLevelUnlocked(progress, level.id)}
              completedStages={getLevelCompletedCount(progress, level)}
              onStart={handleStart}
            />
          ))}
        </section>

        {/* ---------- Daily challenge + badges ---------- */}
        <section className="two-col">
          <DailyChallenge progress={progress} />

          <div className="card">
            <div className="section-head">
              <Award size={20} />
              <h3>ACHIEVEMENT BADGES</h3>
            </div>
            <div className="badge-grid">
              {ACHIEVEMENTS.map((badge) => (
                <AchievementBadge
                  key={badge.id}
                  achievement={badge}
                  earned={progress.achievements.includes(badge.id)}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}