// Progress.jsx – player statistics dashboard.
import { Zap, Target, CheckCircle2, Percent, Award, HelpCircle } from "lucide-react";
import Navbar from "../components/Navbar.jsx";
import ProgressBar from "../components/ProgressBar.jsx";
import AchievementBadge from "../components/AchievementBadge.jsx";
import { LEVELS, ALL_STAGES } from "../data/levels.js";
import { ACHIEVEMENTS } from "../data/achievements.js";
import { getSession } from "../utils/storage.js";
import { useProgress, getLevelPercent, getCompletedStageCount } from "../utils/gameProgress.js";
import { getRank, getAccuracy } from "../utils/scoring.js";

export default function Progress() {
  const session = getSession();
  const progress = useProgress();
  const rank = getRank(progress.xp);

  return (
    <>
      <Navbar />
      <main className="page">
        <span className="tag">Agent @{session?.username}</span>
        <h1>
          MY <span className="gradient-text">PROGRESS</span>
        </h1>

        <section className="stats-grid">
          <div className="card stat-card">
            <Zap size={22} />
            <div>
              <span className="stat-value">{progress.xp}</span>
              <span className="stat-label">Total XP</span>
            </div>
          </div>
          <div className="card stat-card">
            <Award size={22} />
            <div>
              <span className="stat-value stat-small">{rank.name}</span>
              <span className="stat-label">Current rank</span>
            </div>
          </div>
          <div className="card stat-card">
            <Target size={22} />
            <div>
              <span className="stat-value">
                {getCompletedStageCount(progress)}/{ALL_STAGES.length}
              </span>
              <span className="stat-label">Completed missions</span>
            </div>
          </div>
          <div className="card stat-card">
            <HelpCircle size={22} />
            <div>
              <span className="stat-value">{progress.stats.attempted}</span>
              <span className="stat-label">Questions attempted</span>
            </div>
          </div>
          <div className="card stat-card">
            <CheckCircle2 size={22} />
            <div>
              <span className="stat-value">{progress.stats.correct}</span>
              <span className="stat-label">Correct answers</span>
            </div>
          </div>
          <div className="card stat-card">
            <Percent size={22} />
            <div>
              <span className="stat-value">{getAccuracy(progress.stats)}%</span>
              <span className="stat-label">Accuracy</span>
            </div>
          </div>
        </section>

        <section className="card">
          <h3>LEVEL COMPLETION</h3>
          <div className="level-bars">
            {LEVELS.map((level) => (
              <div key={level.id} className={`accent-${level.accent}`}>
                <ProgressBar
                  value={getLevelPercent(progress, level)}
                  label={`${level.name.charAt(0)}${level.name.slice(1).toLowerCase()}`}
                />
              </div>
            ))}
          </div>
        </section>

        <section className="two-col">
          <div className="card">
            <h3>EARNED BADGES</h3>
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

          <div className="card">
            <h3>RECENT ACTIVITY</h3>
            {progress.activity.length === 0 ? (
              <p className="muted">No activity yet. Start a mission from the dashboard!</p>
            ) : (
              <ul className="activity-list">
                {progress.activity.map((item, index) => (
                  <li key={index}>
                    <div>
                      <strong>{item.text}</strong>
                      <span className="muted">{new Date(item.date).toLocaleString()}</span>
                    </div>
                    {item.xp > 0 && <span className="xp-pill">+{item.xp} XP</span>}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </main>
    </>
  );
}