// LevelPage.jsx – lists the 3 games (stages) of one level.
// Beginner.jsx, Intermediate.jsx and Pro.jsx all use this component.
import { Navigate, useNavigate } from "react-router-dom";
import { ArrowLeft, Unlock } from "lucide-react";
import Navbar from "./Navbar.jsx";
import GameCard from "./GameCard.jsx";
import ProgressBar from "./ProgressBar.jsx";
import { LEVELS, getLevelById } from "../data/levels.js";
import {
  useProgress,
  isLevelUnlocked,
  getLevelPercent,
  getLevelCompletedCount,
} from "../utils/gameProgress.js";

export default function LevelPage({ levelId }) {
  const navigate = useNavigate();
  const progress = useProgress();
  const level = getLevelById(levelId);

  // Locked or unknown level: go back to the dashboard
  if (!level || !isLevelUnlocked(progress, levelId)) {
    return <Navigate to="/dashboard" replace />;
  }

  const percent = getLevelPercent(progress, level);
  const completed = getLevelCompletedCount(progress, level);
  const nextLevel = LEVELS[LEVELS.findIndex((l) => l.id === levelId) + 1] || null;

  return (
    <>
      <Navbar />
      <main className={`page accent-${level.accent}`}>
        <button className="back-link" onClick={() => navigate("/dashboard")}>
          <ArrowLeft size={16} /> Back to dashboard
        </button>

        <section className="card level-header">
          <span className="tag" style={{ color: "var(--accent)", borderColor: "var(--accent)" }}>
            Level {level.number}
          </span>
          <h1>
            {level.name} <span className="gradient-text">MISSIONS</span>
          </h1>
          <h4 className="level-title">{level.title}</h4>
          <p className="muted">{level.description}</p>
          <ProgressBar value={percent} label={`${completed}/${level.stages.length} missions completed`} />
        </section>

        <section className="stage-grid">
          {level.stages.map((stage, i) => {
            const saved = progress.stages[stage.id];
            const status = saved.completed
              ? "completed"
              : saved.correctIds.length > 0 || saved.attempts > 0
              ? "inprogress"
              : "new";

            return (
              <GameCard
                key={stage.id}
                stage={stage}
                number={i + 1}
                status={status}
                bestScore={saved.bestScore}
                onPlay={() => navigate(stage.path)}
              />
            );
          })}
        </section>

        {percent === 100 && nextLevel && (
          <section className="unlock-banner">
            <Unlock size={20} /> Level complete! {nextLevel.name} is unlocked.
            <button className="btn btn-primary btn-small" onClick={() => navigate(nextLevel.path)}>
              Go to {nextLevel.name}
            </button>
          </section>
        )}
      </main>
    </>
  );
}